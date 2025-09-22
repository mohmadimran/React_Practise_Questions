import { ContextProviderComp } from "./ContextProvider"
import ChildComponet from "./ChildComponet"

export default function ParentComponent() {
    return (
        <ContextProviderComp>
            <ChildComponet />
        </ContextProviderComp>
    )
}




// import React from "react";
// import { ThemeProvider } from "./ContextProvider";
// import ThemedComponent from "./ChildComponet";

// export default function ParentThemeComponet() {
//   return (
//     <ThemeProvider>
//       <ThemedComponent />
//     </ThemeProvider>
//   );
// }
