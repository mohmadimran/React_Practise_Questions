import { useContext } from "react";
import { contextCreated } from "./ContextProvider";
const ChildComponet = () => {
    const { theme, toggleTheme } = useContext(contextCreated)

    return (
        <>
            <h1>{theme === "light" ? "light mode" : "dark mode"}</h1>
            <button onClick={toggleTheme}>{theme === "light" ? "dark btn" : "light btn"}</button>
        </>
    )
}

export default ChildComponet;




// import React from "react";
// import { useTheme } from "./ContextProvider";

// export default function ThemedComponent() {
//   const { theme, toggleTheme } = useTheme();

//   const appStyle = {
//     backgroundColor: theme === "light" ? "#f9f9f9" : "#1e1e1e",
//     color: theme === "light" ? "#1e1e1e" : "#f9f9f9",
//     minHeight: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.3s",
//     fontFamily: "Arial, sans-serif",
//   };

//   return (
//     <div style={appStyle}>
//       <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
//       <button
//         onClick={toggleTheme}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           cursor: "pointer",
//           borderRadius: "5px",
//         }}
//       >
//         Toggle Theme
//       </button>
//     </div>
//   );
// }
