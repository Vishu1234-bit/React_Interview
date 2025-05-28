//Implement a controlled component form that stores inputs in useState.
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [formData,setFormData] = useState({
    name:"",
    email:"",
  })
  const handleChange=(e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    alert(`Name:${formData.name},Email:${formData.email}`)
  };
  return (<div>
    <h2>Controlled Component</h2>
    <form onSubmit={handleSubmit}>
      <label>Name:
        <input 
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        />
      </label>
      <label>Email:
        <input 
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange}
        required
        />
      </label>
      <button>Submit</button>
    </form>
    </div>);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
