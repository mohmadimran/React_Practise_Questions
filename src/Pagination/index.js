import { useEffect, useState } from "react"

export default function Pagination() {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1)
    const limit = 5;
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);
                const jsonResponse = await response.json();
                console.log("the response", jsonResponse);
                setData(jsonResponse)
                const total = 29;
                setTotalPage(Math.ceil(total / limit))
            } catch (error) {
                console.log("any error", error)
            }
        }
        getData()
    }, [currentPage])

    const paginationNumber = Array.from({ length: totalPage }, (_, value) => (value + 1))
    return (
        <>
            <div>
                <h1>the data</h1>
                <main>{data.map((list) => (
                    <li key={list.id}>{list.author}</li>
                ))}</main>
            </div>
            <div>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>prev</button>
                <div>{paginationNumber.map((list) => (
                    <button key={list} onClick={() => setCurrentPage(list)}>{list}</button>
                ))}</div>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPage}>next</button>
            </div>
        </>
    )
}