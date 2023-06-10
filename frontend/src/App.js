import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[input,setInput] = useState("")
  const[tasks,setTasks] = useState([])

  const onInputChange = (event)=>{
    setInput(event.target.value)
  }

  // GET Data From Backend
  const fetchTasks = () =>{
    fetch("http://localhost:5000/")
    .then(response => response.json())
    .then(data =>{
      setTasks(data)
    })
  }

  // POST Data to Backend
  const onAddTask = () =>{
    if(input){
      fetch("http://localhost:5000/",{
        method: "post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          task: input
        })
      })
      .then(response=>response.json())
      .then(data =>{
        setTasks(data)
      })
      document.getElementById("textField").value="";
      setInput("")
      fetchTasks()
    }
  }

  const onDelete = (delText)=>{
    fetch("http://localhost:5000/",{
        method: "delete",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          deleteText: delText
        })
      })
      fetchTasks()
  }

  useEffect(()=>{
    fetchTasks()
  },[])

  // List JSX
  return (
    <div className="App">
      <h1>To Do List App</h1>
      <div className='inputSection'>
        <button className='label'>Enter Here:</button>
        <input id="textField" onChange={onInputChange} type="text"/>
        <button onClick={onAddTask} className='addButton'>Add Task</button>
      </div>
      {
        tasks.map((task)=>(
          <div className='listItem' key={task.taskId}>
            <h4 className="listText"style={{backgroundColor:"whitesmoke"}}>{task.taskText}</h4>
            <button onClick={()=>onDelete(task.taskText)} className='delBtn'><h4>X</h4></button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
