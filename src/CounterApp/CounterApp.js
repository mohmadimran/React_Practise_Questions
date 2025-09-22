// Counter App
// Build a counter with increment, decrement, and reset buttons. Bonus: prevent it from going below 0.

import { useState } from "react"

export default function CounterApp(){
    const [value, setValue] = useState(0);

    const handleIncrement = ()=>{
        setValue(prev => prev + 1);
    }
    const handleDecrement = ()=>{
        setValue(prev =>{
                if( prev === 0){
                    return prev;
                }
                else{
                   return prev - 1;
                }
        });
    }

    //   const handleDecrement = () => setValue(prev => Math.max(0, prev - 1)); // ✅ cleaner

    const handleReset =()=>{
        setValue(0)
    }
    return(
        <>
        <div>Value:{value}</div>
        <button onClick={handleIncrement}>increment</button>
        <button onClick={handleDecrement}>decrement</button>
        <button onClick={handleReset}>reset</button>
        </>
    )
}