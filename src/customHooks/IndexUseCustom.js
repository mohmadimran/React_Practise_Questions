import React from "react";
import { useCustomHook } from "./CustomHook";

export default function IndexUseCustomHook() {
  const { data, loading, error } = useCustomHook(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error fetching data</h1>}

      <ul>
        {
          data.map((list) => (
            <li key={list.id}>{list.name}</li>
          ))}
      </ul>
    </div>
  );
}
