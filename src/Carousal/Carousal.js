import React, { useState, useEffect } from "react";

const images = [
  "https://picsum.photos/id/1018/800/400",
  "https://picsum.photos/id/1015/800/400",
  "https://picsum.photos/id/1019/800/400",
];

export default function ContinuousCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length); // wrap to first slide
    }, 3000); // 3 seconds per slide
    return () => clearInterval(timer);
  }, []);

  // Next & Prev
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div
      style={{
        width: "800px",
        margin: "20px auto",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
      }}
    >
      {/* Slides */}
      <div
        style={{
          display: "flex",
          transition: "transform 0.5s ease",
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            style={{ width: "100%", flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
        }}
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
        }}
      >
        ▶
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: current === idx ? "white" : "gray",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}


// import React, { useState, useEffect } from "react";

// const images = [
//   "https://picsum.photos/id/1018/800/400",
//   "https://picsum.photos/id/1015/800/400",
//   "https://picsum.photos/id/1019/800/400",
// ];

// export default function SimpleCarouselNoLoop() {
//   const [current, setCurrent] = useState(0);

//   // Auto-slide (stop at last slide)
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrent((prev) =>
//         prev + 1 < images.length ? prev + 1 : prev
//       );
//     }, 3000);
//     return () => clearInterval(timer);
//   }, []);

//   // Next & Prev
//   const nextSlide = () =>
//     setCurrent((prev) => (prev + 1 < images.length ? prev + 1 : prev));
//   const prevSlide = () =>
//     setCurrent((prev) => (prev - 1 >= 0 ? prev - 1 : prev));

//   return (
//     <div
//       style={{
//         width: "800px",
//         margin: "20px auto",
//         position: "relative",
//         overflow: "hidden",
//         borderRadius: "8px",
//       }}
//     >
//       {/* Slides */}
//       <div
//         style={{
//           display: "flex",
//           transition: "transform 0.5s ease",
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {images.map((img, idx) => (
//           <img
//             key={idx}
//             src={img}
//             alt={`slide-${idx}`}
//             style={{ width: "100%", flexShrink: 0 }}
//           />
//         ))}
//       </div>

//       {/* Arrows */}
//       <button
//         onClick={prevSlide}
//         disabled={current === 0}
//         style={{
//           position: "absolute",
//           top: "50%",
//           left: "10px",
//           transform: "translateY(-50%)",
//           opacity: current === 0 ? 0.5 : 1,
//         }}
//       >
//         ◀
//       </button>
//       <button
//         onClick={nextSlide}
//         disabled={current === images.length - 1}
//         style={{
//           position: "absolute",
//           top: "50%",
//           right: "10px",
//           transform: "translateY(-50%)",
//           opacity: current === images.length - 1 ? 0.5 : 1,
//         }}
//       >
//         ▶
//       </button>

//       {/* Dots */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: "10px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           gap: "8px",
//         }}
//       >
//         {images.map((_, idx) => (
//           <span
//             key={idx}
//             onClick={() => setCurrent(idx)}
//             style={{
//               width: "10px",
//               height: "10px",
//               borderRadius: "50%",
//               background: current === idx ? "white" : "gray",
//               cursor: "pointer",
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react"

// export default function Carousal() {
//     const [current, setCurrent] = useState(0);
//     const images = [
//         "https://picsum.photos/id/1018/800/400",
//         "https://picsum.photos/id/1015/800/400",
//         "https://picsum.photos/id/1019/800/400",
//     ];
//     useEffect(() => {
//         const setTiming = setInterval(() => {
//             setCurrent(prev => (prev + 1) % images.length)
//         }, 1000);
//         return () => clearInterval(setTiming)

//     }
//         , [])

//     const handleNext = () => {
//         setCurrent(prev => prev + 1)
//     }
//     const handlePrevious = () => {
//         setCurrent(prev => (prev - 1 + images.length) % images.length);
//     }
//     return (
//         <>
//             <div style={{
//                 width: "800px",
//                 margin: "20px auto",
//                 position: "relative",
//                 overflow: "hidden",
//                 borderRadius: "8px",
//             }}>
//                 <div
//                     style={{
//                         display: "flex",
//                         transition: "transform 0.5s ease",
//                         transform: `translateX(-${current * 100}%)`,
//                     }}
//                 >{images.map((img, ind) => (
//                     <img key={ind} src={img} alt="ind" />
//                 ))}</div>

//                 <button
//                     onClick={handlePrevious}
//                     style={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "10px",
//                         transform: "translateY(-50%)",
//                     }}
//                 >
//                     ◀
//                 </button>
//                 <button
//                     onClick={handleNext}
//                     style={{
//                         position: "absolute",
//                         top: "50%",
//                         right: "10px",
//                         transform: "translateY(-50%)",
//                     }}
//                 ></button>
//                 <div style={{
//                     position: "absolute",
//                     bottom: "10px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     display: "flex",
//                     gap: "8px",
//                 }}>
//                     {images.map((_, index) => (
//                         <span key={index}
//                             onClick={() => setCurrent(index)}
//                             style={{
//                                 width: "10px",
//                                 height: "10px",
//                                 borderRadius: "50%",
//                                 background: current === index ? "white" : "gray",
//                                 cursor: "pointer",
//                             }}></span>
//                     ))}</div>

//             </div>
//         </>
//     )
// }