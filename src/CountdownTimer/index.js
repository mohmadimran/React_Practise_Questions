import { useEffect, useState } from "react";

export default function App() {
  const targetTime = new Date("2026-05-30");
  const targetNumber = targetTime.getTime();

  const [timeLeft, setTimeLeft] = useState(targetNumber - Date.now());

  function timeFormat(date) {
    const d = date.getDate().toString().padStart(2, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      const diff = targetNumber - Date.now();

      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(timerId);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetNumber]);

  const countDownTimeFormat = (sec) => {
    const S = 1000;
    const M = 60 * S;
    const H = 60 * M;
    const D = 24 * H;

    const day = Math.floor(sec / D);
    const hour = Math.floor((sec % D) / H);
    const minute = Math.floor((sec % H) / M);
    const second = Math.floor((sec % M) / S);

    return `${day}D,${hour.toString().padStart(2, "0")}H,${minute
      .toString()
      .padStart(2, "0")}M,${second.toString().padStart(2, "0")}S`;
  };

  return (
    <div>
      <h2>target time {timeFormat(targetTime)}</h2>
      <h6>{countDownTimeFormat(timeLeft)}</h6>
    </div>
  );
}
// SECOND APPROCH.............

// import React, { useEffect, useState } from "react";

// export default function CountdownTimer() {
//   // Target date: Dec 31, 2025, 23:59:59
//   const targetDate = new Date("2025-12-31T23:59:59");
//   const targetTime = targetDate.getTime();

//   const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

//   useEffect(() => {
//     let timerId;

//     function tick() {
//       const diff = targetTime - Date.now();

//       if (diff <= 0) {
//         setTimeLeft(0);
//         return; // stop ticking
//       }

//       setTimeLeft(diff);

//       // Align next tick to the next whole second boundary → avoids drift
//       const delay = 1000 - (Date.now() % 1000);
//       timerId = setTimeout(tick, delay);
//     }

//     tick(); // start immediately on mount

//     return () => clearTimeout(timerId); // cleanup on unmount
//   }, [targetTime]);

//   // Convert ms → days, hours, minutes, seconds
//   // const formatTime = (ms) => {
//   //   const days = Math.floor(ms / (1000 * 60 * 60 * 24));
//   //   const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   //   const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
//   //   const seconds = Math.floor((ms % (1000 * 60)) / 1000);

//   //   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   // };
//    function formatTime(ms) {        
//         const S = 1000;
//         const M = 60 * S;
//         const H = 60 * M;
//         const D = 24 * H;

//         const days = Math.floor(ms / D);
//         const hours = Math.floor((ms % D) / H);
//         const minutes = Math.floor((ms % H) / M);
//         const seconds = Math.floor((ms % M) / S);
//         return `${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
//     }

//   // Format target date → DD-MM-YYYY
//   const formatDate = (date) => {
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 since months are 0-based
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   return (
//     <div style={{ textAlign: "center", margin: "20px" }}>
//       <h1>⏳ Countdown Timer</h1>
//       <h3>Target Date: {formatDate(targetDate)}</h3>

//       {timeLeft > 0 ? (
//         <h2>{formatTime(timeLeft)}</h2>
//       ) : (
//         <h2>🎉 Countdown Finished!</h2>
//       )}
//     </div>
//   );
// }


