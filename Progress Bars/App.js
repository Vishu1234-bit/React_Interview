import {useState} from "react";
export default function App() {
  const [progressBars,setProgressBars] = useState([])
  function addProgressBar(){
    const id = Date.now();
    setProgressBars([...progressBars,{id,progress:0}]);
    setTimeout(()=>{
      setProgressBars((prevBar)=>
      prevBar.map((bar)=>
      bar.id===id?{...bar,progress:100}:bar
      )
      );
    },50)
  };
  return (
    <div>
      <button onClick={addProgressBar}>Add</button>
      <div className='progress-container'>
      {progressBars.map((bar)=>{
      return <div key={bar.id} className='progress-wrapper'>
      <div 
      className = 'progress-bar'
      style={{width:`${bar.progress}%`,transition:"width 2s ease-in-out"}}></div>
      </div>
      })}
      </div>
    </div>
  );
}
