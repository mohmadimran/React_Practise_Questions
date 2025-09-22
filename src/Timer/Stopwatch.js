// import React, { useState, useRef } from "react";

import { useRef, useState } from "react"

// export default function Stopwatch() {
//   const [time, setTime] = useState(0); // ms
//   const [isRunning, setIsRunning] = useState(false);
//   const timerRef = useRef(null);

//   const start = () => {
//     if (!isRunning) {
//       setIsRunning(true);
//       timerRef.current = setInterval(() => {
//         setTime((prev) => prev + 10);
//       }, 10);
//     }
//   };

//   const pause = () => {
//     clearInterval(timerRef.current);
//     setIsRunning(false);
//   };

//   const reset = () => {
//     clearInterval(timerRef.current);
//     setIsRunning(false);
//     setTime(0);
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);
//     const milliseconds = Math.floor((time % 1000) / 10);
//     return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
//       2,
//       "0"
//     )}:${String(milliseconds).padStart(2, "0")}`;
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "20px" }}>
//       <h1>⏱ Stopwatch</h1>
//       <h2>{formatTime(time)}</h2>
//       <div>
//         <button onClick={start}>Start</button>
//         <button onClick={pause}>Pause</button>
//         <button onClick={reset}>Reset</button>
//       </div>
//     </div>
//   );
// }

export default function Stopwatch() {
  const [timer, setTimer] = useState(0)
  const [active, setActive] = useState(false)
  const currentPosition = useRef()

  const handleStart = () => {
    if (!active) {
      setActive(true);
      currentPosition.current = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10)
    }
  }
  const handleStop = () => {
    clearInterval(currentPosition.current)
    setActive(false)
  }
  const handleReset = () => {
    clearInterval(currentPosition.current)

    setActive(false)
    setTimer(0)
  }
const countFormat =(time)=>{
  const minut = Math.floor(time/60000);
  const second = Math.floor((time%60000)/1000);
  const miliSecond = Math.floor((time%1000)/10);
  return `${String(minut).padStart(2,"0")}: ${String(second).padStart(2,"0")}:${String(miliSecond).padStart(2,"0")}`
}
  return (
    <>
      <div>{countFormat(timer)}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
      <button onClick={handleReset}>reset</button>
    </>
  )
}