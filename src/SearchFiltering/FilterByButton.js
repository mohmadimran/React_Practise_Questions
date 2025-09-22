//  Q Search with Filter
// first show the data and then filter the data By Button.
import { useEffect, useState } from "react"

export default function FilterByButton() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([])
    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        const apiResponse = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const jsonData = await response.json();
                console.log(jsonData)
                setData(jsonData)
                setFilterData(jsonData)
            } catch (error) {
                console.log(error)
            }
        }
        apiResponse()
    }, [])

    const handleFilter = () => {
        if (!query.trim()) {
            setFilterData(data);
        }
        const filterResponse = data.filter((list) => (
            list.name.toLowerCase().includes(query.toLowerCase())
        ));
        setFilterData(filterResponse)
    }

    return (
        <>
            <div>
                <input type="text" placeholder="search" onChange={(e) => setQuery(e.target.value)} />
                <button onClick={handleFilter}>Search</button>
                <div>
                    {
                        filterData.length > 0 ? filterData.map((list) => (
                            <li key={list.id}>{list.name}</li>
                        )) : <h1>data not found</h1>
                    }
                </div>
            </div>
        </>
    )
}