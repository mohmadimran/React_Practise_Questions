import { useEffect, useState } from "react"

export default function DebouncingFun() {
    const [query, setQuery] = useState("");
    const [dbounceQuery, setDebouncQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const queryTime = setTimeout(() => {
            setDebouncQuery(query)
        }, 5000)

        return () => clearTimeout(queryTime)
    }, [query])

    useEffect(() => {
        if (!dbounceQuery) {
            setData([]);
            return;
        }
        const apiData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const jsonData = await response.json();
                console.log("api data", jsonData)

                const filterdData = jsonData.filter((list) => (
                    list.name.toLowerCase().includes(dbounceQuery.toLowerCase())

                )
                )
                setData(filterdData)
            }
            catch (error) {
                console.log(error)
            }
        }
        apiData()
    }, [dbounceQuery])

    return (
        <>
            <input type="text" value={query} placeholder="search" onChange={(e) => setQuery(e.target.value)} />
            <div>
                {data.map((list) => (
                    <li key={list.id}>{list.name}</li>
                ))}
            </div>
        </>
    )
}