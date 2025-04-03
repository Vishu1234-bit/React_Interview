import {useEffect,useState} from "react";
export default function Stopwatch() {
  const [hours,setHours] = useState(0);
  const [minutes,setMinutes] = useState(0);
  const [seconds,setSeconds] = useState(0);
  const [milliSec,setMilliSec] = useState(0);
  const [isRunning,setIsRunning] = useState(false);
  useEffect(()=>{
    let interval;
    if(isRunning){
    interval = setInterval(()=>{
      setMilliSec((prevMilliSec)=>{
      if(prevMilliSec>=99){
        setSeconds((seconds)=>{
          if(seconds>=59){
            setMinutes((minutes)=>{
              if(minutes>=59){
                setHours(prevhours=>prevhours+1);
                return 0;
              }
              return minutes+1;
            });
            return 0;
          }
          return seconds+1;
        });
        return 0;
      }
      return prevMilliSec+1
      })
    },10);
    }
    return ()=>clearInterval(interval);
  },[isRunning])
  function toggleStopWatch(){
    setIsRunning((prevRunState)=>!prevRunState);
  }
  function resetStopWatch(){
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setMilliSec(0);
    setIsRunning(false);
  }
  return (
    <div>
      <p onClick={()=>toggleStopWatch()}>{String(hours).padStart(2,"0")}:{String(minutes).padStart(2,"0")}:{String(seconds).padStart(2,"0")}:{String(milliSec).padStart(2,"0")}</p>
      <div>
        <button onClick={()=>toggleStopWatch()}>{isRunning?"Stop":"Start"}</button> 
        <button onClick={()=>resetStopWatch()}>Reset</button>
      </div>
    </div>
  );
}
