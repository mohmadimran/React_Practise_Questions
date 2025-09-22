import { createContext, useState } from "react";

export const contextCreated = createContext();

export const ContextProviderComp = ({ children }) => {
    const [ theme, setTheme] = useState("light")
    const toggleTheme =()=>{
        setTheme(theme === "light" ? "dark" : "light")
    }
    return (
        <contextCreated.Provider value={{theme,toggleTheme}}>
            {children}
        </contextCreated.Provider>
    )
}


// import React, { createContext, useContext, useState } from "react";

// // Create Theme Context
// const ThemeContext = createContext();

// // Theme Provider
// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("light"); // default theme

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// // Custom hook for easy access
// export function useTheme() {
//   return useContext(ThemeContext);
// }
