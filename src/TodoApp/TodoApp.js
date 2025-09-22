import { useState } from "react"

export default function(){
    const [getInput,setGetInput] = useState("");
    const [todoData,setTodoData] = useState([]);

    const handleAdd = ()=>{
        if(!getInput.trim())return;
        setTodoData([{
            id:Date.now(),
            title:getInput,
            completed:false
        },...todoData])
        setGetInput("")
    }
const handleDelete =(id)=>{
    setTodoData(todoData.filter((val)=>val.id !== id))
}
    return(
        <>
        <div>
            <input type="text" placeholder="insert data" value={getInput} onChange={(e)=>setGetInput(e.target.value)}/>
            <button type="button" onClick={handleAdd}>Add</button>
            <div>
                {todoData.map((list)=>(
                    <li key={list.id}>{list.title}=<span onClick={()=>handleDelete(list.id)}>delete</span></li>

                ))}
            </div>
        </div>
        </>
    )
}