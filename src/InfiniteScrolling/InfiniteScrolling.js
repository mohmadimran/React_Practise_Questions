import { useEffect, useState } from "react"

export default function InfiniteScroll() {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])

    const callApi = async () => {
        setLoading(true)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
            const apiData = await response.json();
            setData((prev)=> [...prev,...apiData])
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

        useEffect(() => {
            callApi()
        }, [page])

    useEffect(() => {
        const handlePagination = () => {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight-200 && !loading) {
                setPage((prev => prev + 1))
            }
        }
        window.addEventListener("scroll", handlePagination);
        return () => window.removeEventListener("scroll", handlePagination)
    }, [loading])
    return (
        <>
            <div>
                {data.map((list) => (
                    <div key={list.id}>
                        <h1>{list.title}</h1>
                        <p>{list.description}</p>
                    </div>
                ))}
            </div>
            <div>{loading && <h1>Loading..................</h1>}</div>
        </>
    )
}