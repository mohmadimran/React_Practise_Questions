//  Q Search with Filter
// Given a list of items (users/products), implement search with debouncing and filtering.
// first show the data and then filter the data
import { useEffect, useState } from "react"

export default function SearchFilter() {
    const [query, setQuery] = useState("");
    const [debouncingQuery, setDebouncingQuery] = useState("");
    const [data, setData] = useState([])


    useEffect(() => {
        const delayQuery = setTimeout(() => {
            setDebouncingQuery(query);
            console.log("take a time")
            return () => clearTimeout(delayQuery)
        }, 5000)
    }, [query])

    useEffect(() => {
        const apiResponse = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");
                const jsonData = await response.json();
                console.log(jsonData)
                setData(jsonData)
            } catch (error) {
                console.log(error)
            }
        }
        apiResponse()
    }, [])
    const fileterdData = data.filter((list) => (
        list.name.toLowerCase().includes(debouncingQuery.toLowerCase())
    ))

    return (
        <>
            <div>
                <input type="text" placeholder="search" onChange={(e) => setQuery(e.target.value)} />
                <div>
                    {
                        fileterdData.length > 0 ? fileterdData.map((list) => (
                            <li key={list.id}>{list.name}</li>
                        )) : <h1>data not found</h1>
                    }
                </div>
            </div>
        </>
    )
}