import { useState } from 'react';

export default function FileExplorer({ data }) {
  const [expanded,setExpanded] = useState({});
  function toggle(id){
     setExpanded(
     (prev)=>({
      ...prev,
      [id]:!prev[id],
     })
     );
  }
  return (
    <div>
      <div>
      {data.map((directory) =>
        ((directory.children && directory?.children?.length>0) ?
        (
        <div key={directory.id}>
        <h1>{directory.name} 
        <span onClick={()=>toggle(directory.id)}>
        {expanded[directory.id]?"[-]":"[+]"}
        </span>
         </h1>
         <div>
         {expanded[directory.id]&& 
         <div>
         {directory.children.map((child)=>(
          <p key={child.id}>{child.name}</p>
         ))}
         </div>
         }
         </div>
         </div>
         ):
        (<p key={directory.id}>{directory.name}</p>)
        ))
      }</div>

    </div>
  );
}
