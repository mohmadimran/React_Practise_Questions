import React, { useEffect, useState } from "react";
import ReusableComponent from "./ReusableComponent";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // items per page

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_page=${currentPage}&_limit=${limit}`
      );
      const data = await res.json();

      // jsonplaceholder does NOT return total count in headers,
      // so we'll hardcode total (there are 10 users only).
      const totalCount = 10;
      setTotalPages(Math.ceil(totalCount / limit));

      setUsers(data);
    };

    fetchUsers();
  }, [currentPage]);

  return (
    <div>
      <h2>Users List (Page {currentPage})</h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.name}</strong> ({u.email})
          </li>
        ))}
      </ul>

      <ReusableComponent
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
