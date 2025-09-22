import { useState } from "react"

export default function StarRating() {
    const [rating,setRating] = useState(0)
    const [current,setCurrent] = useState(0)

    const totalRating = 5;
    return (
        <>
            <div>{
                [...Array(totalRating)].map((_, index) => {
                    const itrateValue = index + 1;
                    return (
                        <button type="button"
                        key={index}
                        onClick={()=>setRating(itrateValue)}
                        onMouseEnter={()=>setCurrent(itrateValue)}
                        onMouseLeave={()=>setCurrent(0)}
                        style={{color: itrateValue <= (rating || current) ? "gold":"green"}}
                        >
                            ★
                        </button>
                    )
                })
            }</div>
        </>
    )
}