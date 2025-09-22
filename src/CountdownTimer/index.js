import React, { useEffect, useState } from "react";

export default function CountdownTimer() {
  // Target date: Dec 31, 2025, 23:59:59
  const targetDate = new Date("2025-12-31T23:59:59");
  const targetTime = targetDate.getTime();

  const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

  useEffect(() => {
    let timerId;

    function tick() {
      const diff = targetTime - Date.now();

      if (diff <= 0) {
        setTimeLeft(0);
        return; // stop ticking
      }

      setTimeLeft(diff);

      // Align next tick to the next whole second boundary → avoids drift
      const delay = 1000 - (Date.now() % 1000);
      timerId = setTimeout(tick, delay);
    }

    tick(); // start immediately on mount

    return () => clearTimeout(timerId); // cleanup on unmount
  }, [targetTime]);

  // Convert ms → days, hours, minutes, seconds
  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Format target date → DD-MM-YYYY
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 since months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>⏳ Countdown Timer</h1>
      <h3>Target Date: {formatDate(targetDate)}</h3>

      {timeLeft > 0 ? (
        <h2>{formatTime(timeLeft)}</h2>
      ) : (
        <h2>🎉 Countdown Finished!</h2>
      )}
    </div>
  );
}
