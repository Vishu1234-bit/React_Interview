import {useState,useEffect} from "react";
export default function TrafficLight() {
  const [activelight,setActiveLight] = useState("red");
  useEffect(()=>{
    let timer;
    if(activelight==="red"){
      timer = setTimeout(()=>(setActiveLight("yellow")),500);
    }else if(activelight==="yellow"){
      timer = setTimeout(()=>(setActiveLight("green")),3000);
    }else{
      timer = setTimeout(()=>(setActiveLight("red")),4000);
    }
    return (()=>clearTimeout(timer));
  },[activelight])
  return(
    <>
    <div className="traffic-light">
    <div className="vertical-traffic">
    <div className={`light ${activelight==="red"?"red":""}`}></div>
    <div className={`light ${activelight==="yellow"?"yellow":""}`}></div>
    <div className={`light ${activelight==="green"?"green":""}`}></div>
    </div>
    <div className="horizontal-traffic">
    <div className={`light ${activelight==="red"?"red":""}`}></div>
    <div className={`light ${activelight==="yellow"?"yellow":""}`}></div>
    <div className={`light ${activelight==="green"?"green":""}`}></div>
    </div>
    </div>
    </>
  );
}
