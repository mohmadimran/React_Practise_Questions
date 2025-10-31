import React, { useState, useEffect, useRef } from "react";

export default function VirtualizedListWithAPI() {
  const [items, setItems] = useState([]);
  const [scrollTop, setScrollTop] = useState(0);

  const itemHeight = 50; // fixed height
  const height = 400; // viewport height
  const viewportRef = useRef(null);

  // Fetch mock data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // Duplicate data to simulate large dataset
        const bigData = Array(100)
          .fill(null)
          .flatMap(() => data); // ~10,000 items
        setItems(bigData);
      });
  }, []);

  const visibleCount = Math.ceil(height / itemHeight);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(viewportRef.current.scrollTop);
    };
    const el = viewportRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + 3 // overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  return (
    <div>
      <h2>📜 Virtualized List (Mock API Data)</h2>
      {items.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div
          ref={viewportRef}
          style={{
            height,
            overflowY: "auto",
            border: "1px solid #ccc",
            position: "relative",
          }}
        >
          <div style={{ height: items.length * itemHeight, position: "relative" }}>
            <div
              style={{
                transform: `translateY(${startIndex * itemHeight}px)`,
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
              }}
            >
              {visibleItems.map((item, index) => (
                <div
                  key={startIndex + index}
                  style={{
                    height: itemHeight,
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    background: (startIndex + index) % 2 === 0 ? "#fafafa" : "#fff",
                  }}
                >
                  <strong>{item.id}.</strong> {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useState, useRef, useEffect } from "react";

// export default function VirtualizedList() {
//   // total items
//   const itemCount = 10000;
//   // each item fixed height
//   const itemHeight = 40;
//   // viewport height
//   const height = 400;

//   const [scrollTop, setScrollTop] = useState(0);
//   const viewportRef = useRef(null);

//   const visibleCount = Math.ceil(height / itemHeight);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollTop(viewportRef.current.scrollTop);
//     };
//     const el = viewportRef.current;
//     el.addEventListener("scroll", handleScroll);
//     return () => el.removeEventListener("scroll", handleScroll);
//   }, []);

//   // calculate which items should be visible
//   const startIndex = Math.floor(scrollTop / itemHeight);
//   const endIndex = Math.min(
//     itemCount - 1,
//     startIndex + visibleCount + 3 // 3 for overscan
//   );

//   const items = [];
//   for (let i = startIndex; i <= endIndex; i++) {
//     items.push(
//       <div
//         key={i}
//         style={{
//           height: itemHeight,
//           display: "flex",
//           alignItems: "center",
//           borderBottom: "1px solid #eee",
//           padding: "0 10px",
//           background: i % 2 === 0 ? "#fafafa" : "white",
//         }}
//       >
//         Item #{i + 1}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Virtualized List Example</h2>
//       <div
//         ref={viewportRef}
//         style={{
//           height,
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           position: "relative",
//         }}
//       >
//         <div style={{ height: itemCount * itemHeight, position: "relative" }}>
//           <div
//             style={{
//               transform: `translateY(${startIndex * itemHeight}px)`,
//               position: "absolute",
//               top: 0,
//               left: 0,
//               right: 0,
//             }}
//           >
//             {items}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
