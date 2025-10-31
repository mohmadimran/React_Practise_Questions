
import React, { useState } from "react";

// Child Component A (input field)
function ChildA({ onChangeData }) {
  return (
    <div>
      <h3>Child A</h3>
      <input
        type="text"
        placeholder="Enter text"
        onChange={(e) => onChangeData(e.target.value)}
      />
    </div>
  );
}

// Child Component B (display data)
function ChildB({ data }) {
  return (
    <div>
      <h3>Child B</h3>
      <p>Data from Child A: {data}</p>
    </div>
  );
}

// Parent Component
export default function Parent() {
  const [sharedData, setSharedData] = useState("");

  return (
    <div>
      <h2>Parent Component</h2>
      {/* Passing state updater function to Child A */}
      <ChildA onChangeData={setSharedData} />
      {/* Passing state to Child B */}
      <ChildB data={sharedData} />
    </div>
  );
}
