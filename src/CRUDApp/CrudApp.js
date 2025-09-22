import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"

const url = "https://jsonplaceholder.typicode.com/posts";

export default function CrudApp() {
    const [input, setInput] = useState("")
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState("")

    // read the data
    useEffect(() => {
        const getResponse = async () => {
            try {
                const response = await axios(url);
                const jsonData = response.data;
                console.log(jsonData)
                setData(jsonData)
            } catch (error) {
                console.log(error);
            }
        }
        getResponse()
    }, [])

    const handleCreatData = () => {
        if (!input.trim()) return;
        axios.post(url, { title: input, id: Date.now() }).then((val) => {
            setData([val.data, ...data])

        }).catch((error) => console.log(error));
        setInput("")
    }

    const handleDelete = (id) => {
        axios.delete(`${url}/${id}`).then((val) => {
            const filterData = data.filter((item) => item.id !== id)
            setData(filterData)
        }).catch((error) => console.log(error))
    }

    const handleEdit = async(id) => {
     try{
        const response = await axios.put(`${url}/${id}`,{...data.find((item)=>item.id === id), title:editData});
        setData(data.map((item)=> item.id === id ? response.data : item))
        setEditData("");
        setEditId(null)
     }
     catch(erorr){
        console.log(erorr)
     }
    }



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