import { useEffect, useState } from "react"

export default function InfiniteScroll() {
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1);
    const [data, setData] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [error, setError] = useState(null)

    const callApi = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
            const apiData = await response.json();
            
            if (apiData.length === 0) {
                setHasMore(false)
            } else {
                setData((prev)=> [...prev, ...apiData])
            }
        }
        catch (error) {
            setError("Failed to load data. Please try again.")
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (hasMore) {
            callApi()
        }
    }, [page])

    useEffect(() => {
        const handlePagination = () => {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200 && !loading && hasMore) {
                setPage(prev => prev + 1)
            }
        }
        
        window.addEventListener("scroll", handlePagination);
        return () => window.removeEventListener("scroll", handlePagination)
    }, [loading, hasMore])

    return (
        <>
            <div>
                {data.map((list) => (
                    <div key={list.id} style={{border: "1px solid #ccc", margin: "10px", padding: "10px"}}>
                        <h3>{list.title}</h3>
                        <p>{list.body}</p>  {/* Fixed: use 'body' instead of 'description' */}
                    </div>
                ))}
            </div>
            
            {loading && <div style={{textAlign: "center", padding: "20px"}}>Loading...</div>}
            
            {error && <div style={{color: "red", textAlign: "center"}}>{error}</div>}
            
            {!hasMore && data.length > 0 && (
                <div style={{textAlign: "center", padding: "20px"}}>No more posts to load</div>
            )}
        </>
    )
}
