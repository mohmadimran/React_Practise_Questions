import { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

export default function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // READ (GET)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(API_URL);
      const result = await res.json();
      setData(result.slice(0, 10)); // limit data
      setLoading(false);
    };

    fetchData();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (editId !== null) {
      // UPDATE (PUT)
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        body: JSON.stringify({ title: input }),
        headers: { "Content-Type": "application/json" },
      });

      setData((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title: input } : item
        )
      );

      setEditId(null);
    } else {
      // CREATE (POST)
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ title: input }),
        headers: { "Content-Type": "application/json" },
      });

      const newItem = await res.json();

      setData((prev) => [{ ...newItem, id: Date.now() }, ...prev]);
    }

    setInput("");
  };

  // DELETE
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // EDIT
  const handleEdit = (item) => {
    setInput(item.title);
    setEditId(item.id);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>CRUD with Fake API</h2>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter title"
        />
        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {data.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>

          <button onClick={() => handleEdit(item)}>
            Edit
          </button>

          <button onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
