import React, { useState, useMemo } from "react";

const users = [
  { id: 1, name: "Alex" },
  { id: 2, name: "Imran" },
  { id: 3, name: "John" },
  { id: 4, name: "Mary" },
];

function UserListWithMemo() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light");

  // ✅ Filtering only runs when `search` changes
  const filteredUsers = useMemo(() => {
    console.log("Filtering users...");
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme (Current: {theme})
      </button>

      <input
        type="text"
        placeholder="Search user"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredUsers.map(u => <li key={u.id}>{u.name}</li>)}
      </ul>
    </div>
  );
}

export default UserListWithMemo;


// one another example

import { useState, useMemo } from 'react';

function Demo() {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [unrelated, setUnrelated] = useState(0);
  
  // EXPENSIVE calculation (pretend it takes 1 second)
  const expensiveProduct = useMemo(() => {
    console.log("🔴 RUNNING EXPENSIVE MULTIPLICATION...");
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
      result = num1 * num2; // Simulating hard work
    }
    return result;
  }, [num1, num2]); // Only depends on num1 and num2
  
  console.log("Component rendering");
  
  return (
    <div>
      <h3>Expensive Result: {expensiveProduct}</h3>
      
      <div>
        <button onClick={() => setNum1(num1 + 1)}>
          Change num1: {num1}
        </button>
        <button onClick={() => setNum2(num2 + 1)}>
          Change num2: {num2}
        </button>
      </div>
      
      <div>
        <button onClick={() => setUnrelated(unrelated + 1)}>
          Unrelated Click: {unrelated}
        </button>
        <p style={{color: 'green'}}>
          ✅ Clicking "Unrelated" button does NOT trigger recalculation!
          Check the console - no "RUNNING EXPENSIVE MULTIPLICATION" message.
        </p>
      </div>
    </div>
  );
}
