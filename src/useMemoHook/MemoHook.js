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
