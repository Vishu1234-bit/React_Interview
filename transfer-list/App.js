import {useState} from "react";
export default function App() {
  const [leftList,setLeftList] = useState(["HTML","JavaScript","CSS","TypeScript"]);
  const [rightList,setRightList] = useState(["React","Angular","Vue","Svelte"]);
  const [buttons,setButtons] = useState(["<<","<",">",">>"]);
  const [leftChecked,setLeftChecked] = useState({});
  const [rightChecked,setRightChecked] = useState({});
  function setChecked(pos,e){
    let {name,checked} = e.target;
    if(pos=="left"){
      setLeftChecked((prev)=>({
        ...prev,
        [name] : checked
      }))
    }else{
      setRightChecked((prev)=>({
        ...prev,
        [name] : checked
      }))
    }
    console.log(leftChecked,rightChecked);
  }
  function buttonAction(button) {
  const rightCheckedItems = Object.keys(rightChecked).filter((item) => rightChecked[item]);
  const leftCheckedItems = Object.keys(leftChecked).filter((item) => leftChecked[item]);

  switch (button) {
    case ">>":
      setRightList((prev) => [...prev, ...leftList]);
      setLeftList([]);
      setRightChecked((prev) => {
        const updated = { ...prev };
        leftList.forEach((item) => {
          if (leftChecked[item]) updated[item] = true;
        });
        return updated;
      });
      setLeftChecked({});
      break;

    case "<<":
      setLeftList((prev) => [...prev, ...rightList]);
      setRightList([]);
      setLeftChecked((prev) => {
        const updated = { ...prev };
        rightList.forEach((item) => {
          if (rightChecked[item]) updated[item] = true;
        });
        return updated;
      });
      setRightChecked({});
      break;

    case ">":
      setRightList((prev) => [...prev, ...leftCheckedItems]);
      setLeftList((prev) => prev.filter((item) => !leftChecked[item]));

      // Add checked items to rightChecked
      setRightChecked((prev) => {
        const updated = { ...prev };
        leftCheckedItems.forEach((item) => {
          updated[item] = true;
        });
        return updated;
      });

      // Remove moved items from leftChecked
      setLeftChecked((prev) => {
        const updated = { ...prev };
        leftCheckedItems.forEach((item) => {
          delete updated[item];
        });
        return updated;
      });
      break;

    case "<":
      setLeftList((prev) => [...prev, ...rightCheckedItems]);
      setRightList((prev) => prev.filter((item) => !rightChecked[item]));

      // Add checked items to leftChecked
      setLeftChecked((prev) => {
        const updated = { ...prev };
        rightCheckedItems.forEach((item) => {
          updated[item] = true;
        });
        return updated;
      });

      // Remove moved items from rightChecked
      setRightChecked((prev) => {
        const updated = { ...prev };
        rightCheckedItems.forEach((item) => {
          delete updated[item];
        });
        return updated;
      });
      break;
  }
}

  return (
    <div>
      <div className="transfer-list">
        <div>
        <ul className="left-list">
        {leftList && leftList.length>0 && 
        leftList?.map((tech,index)=>{
          return (<label key={index}>
          <input 
          type="checkbox" 
          name={tech} 
          checked = {leftChecked[tech]||false}
          onChange = {(e)=>setChecked("left",e)}/>{tech}
          </label>)
        })}
        </ul>
        </div>
        <div className="buttons">
        {buttons.length>0 && 
        buttons?.map((but,index)=>{
          return <button 
          key={index} 
          onClick={()=>buttonAction(but)}
          disabled={but=="<<" && rightList.length==0 || 
          but==">>" && leftList.length==0 ||
          but=="<" && Object.values(rightChecked).every((val)=>!val) || 
          but==">" && Object.values(leftChecked).every((val)=>!val)}>{but}</button>
        })}
        </div>
        <div>
        <ul className="right-list">
        {rightList.length>0 && 
        rightList?.map((tech,index)=>{
           return (<label key={index}>
          <input 
          type="checkbox" 
          name={tech} 
          checked = {rightChecked[tech]||false}
          onChange = {(e)=>setChecked("right",e)}/>{tech}
          </label>)
        })}
        </ul>
        </div>
      </div>
    </div>
  );
}
