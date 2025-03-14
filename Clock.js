import {useState,useEffect} from "react";
export default function Clock() {
  const [time,setTime] = useState(new Date())
  useEffect(()=>{
    setTimeout(()=>{setTime(new Date())},1000)
    return ()=>clearTimeout();
  },[])
  function formatTime(time){
    return time.toString().padStart(2,"0")
  }
  return <div className="digitalClock">
        {formatTime(time.getHours())}:
        {formatTime(time.getMinutes())}:
        {formatTime(time.getSeconds())}
         </div>;
}
