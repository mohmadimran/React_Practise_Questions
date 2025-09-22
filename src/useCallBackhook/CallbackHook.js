import React, { useState, useCallback } from "react";

const ChildButton = React.memo(function ChildButton({ handleClick }) {
  console.log("ChildButton render");
  return <button onClick={handleClick}>Click me</button>;
});

export default function Parent() {
  const [count, setCount] = useState(0);

  // Same function instance unless deps change
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []); // no deps => stable reference

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment parent</button>
      <ChildButton handleClick={handleClick} />
    </div>
  );
}
