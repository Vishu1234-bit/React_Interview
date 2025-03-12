import {useState} from "react";
export default function App() {
  const [tasks,setTasks] = useState([]);
  const [inputValue,setInputValue] =useState("");
  function handleTasks(){
    if(inputValue.trim() === ""){
      return 
    }
    setTasks([...tasks,inputValue])
    setInputValue("");
  }
function deleteTasks(index){
  setTasks(tasks.filter((_,i)=>i!==index));
}
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input 
        type="text" 
        value = {inputValue}
        onChange={(e)=>setInputValue(e.target.value)}
        placeholder="Add your task" />
        <div>
          <button onClick = {handleTasks}>Submit</button>
        </div>
      </div>

      {tasks.length>0 && 
      <ul>
       {tasks.map((task,index)=>(
        <li key={index}>
          <span>{task}</span>
          <button onClick={()=>deleteTasks(index)}>Delete</button>
        </li>
        ))}
      </ul>}
    </div>
  );
}
