import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"

const url = "https://jsonplaceholder.typicode.com/posts";

export default function CrudApp() {
    const [input, setInput] = useState("")
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState("")

    useEffect(() => {
  const getResponse = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.log(error);
    }
  };
  getResponse();
}, []);

const handleCreateData = async () => {
  if (!input.trim()) return;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: input, id: Date.now() }),
    });
    if (!response.ok) throw new Error("Failed to create data");
    const newData = await response.json();
    setData([newData, ...data]);
  } catch (error) {
    console.log(error);
  }
  setInput("");
};

const handleDelete = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete data");
    const filterData = data.filter((item) => item.id !== id);
    setData(filterData);
  } catch (error) {
    console.log(error);
  }
};

const handleEdit = async (id) => {
  try {
    const itemToEdit = data.find((item) => item.id === id);
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...itemToEdit, title: editData }),
    });
    if (!response.ok) throw new Error("Failed to update data");
    const updatedItem = await response.json();
    setData(data.map((item) => (item.id === id ? updatedItem : item)));
    setEditData("");
    setEditId(null);
  } catch (error) {
    console.log(error);
  }
};

    return (
        <div>
            <input type="text" placeholder="input the data" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={handleCreatData}>Add</button>
            <div>{data.map((list) => (
                <React.Fragment key={list.id}>
                    <li>{list.title}</li>
                    {editId === list.id ?
                        <> <input type="text" placeholder="edit input" value={editData} onChange={(e) => setEditData(e.target.value)} />
                            <button onClick={() => handleEdit(list.id)}>save</button></>
                        : <button onClick={() => { setEditId(list.id); setEditData(list.title) }}>edit</button>
                    }
                    <button onClick={() => handleDelete(list.id)}>delete</button>
                </React.Fragment>
            ))}</div>
        </div>
    )
}
