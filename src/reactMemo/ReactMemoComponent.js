import React, { useState } from "react";

// React.memo prevents re-render if props didn't change
const Child = React.memo(({name})=>{
console.log("it is child component");
return (
    <h1> this is the child of parent</h1>
)
})
export default function ParentReactMemoComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment {count}</button>
      {/* Child won't re-render unless `name` changes */}
      <Child name="Alex" />
    </div>
  );
}
