import submitForm from './submitForm';
import {useState} from "react";
export default function App() {
  const [formData,setFormData] = useState({
  name:"",
  email:"",
  message:"",
});
function handleChange(e){
  setFormData({
    ...formData,
    [e.target.name]:e.target.value,
  })
}
  return (
    <form
      onSubmit={submitForm}
      action="https://www.greatfrontend.com/api/questions/contact-form" 
      method="post">
      <label>
      Name: 
      <input 
      type="text"
      name="name"
      value={formData.name}
      onChange = {handleChange} />
      </label>
      <label>
      Email: 
      <input 
      type="email"
      name = "email" 
      value={formData.email}
      onChange = {handleChange}/>
      </label>
      <label>
      Message: 
      <textarea 
      name="message" 
      value={formData.message}
      onChange = {handleChange} />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
