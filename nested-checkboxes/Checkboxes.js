import { useState,useEffect } from 'react';

export default function Checkboxes({
  defaultCheckboxData,
}) {
  const [checkedMap,setChecked] = useState({})
  const [parentmap,setParentMap] = useState({})
  const [indeterminateMap,setIndeterminateMap] = useState({})
  useEffect(()=>{
      const map = {};
      const buildMap = (data,parent=null) =>{
        data?.forEach((item)=>
         
          {if(parent){
          map[item.id] = parent.id;
         }
        if(item.children){
          buildMap(item.children,item)
        }
      })
      }
      buildMap(defaultCheckboxData)
      setParentMap(map);
  },[defaultCheckboxData])
  function findItem(defaultCheckboxData,targetid){
    for(let item of defaultCheckboxData){
      if(item.id==targetid){
        return item;
      }
      if(item.children){
        const found = findItem(item.children,targetid)
        if(found) return found;
      }
    }
     return null;
  }
  function uncheckAllChildren(item,updatedCheck){
    if(item.children){
      item.children.forEach((child)=>{
        updatedCheck[child.id] = false;
        uncheckAllChildren(child,updatedCheck);
      })
    }
  }
  function checkAllChildren(item,updatedCheck){
    if(item.children){
      item.children.forEach((child)=>{
        updatedCheck[child.id] = true;
        checkAllChildren(child,updatedCheck);
      })
    }
  }
  function updateParents(id,updatedCheck,updatedIndeterminate={}){
    const parentid = parentmap[id];
    if(!parentid) return;
    const parentItem =findItem(defaultCheckboxData,parentid);
    const isAllchildrenchecked = parentItem?.children?.every((child)=>updatedCheck[child.id]);
    const nonechildrenChecked = parentItem?.children?.every((child)=>!updatedCheck[child.id]);
    updatedCheck[parentid] = isAllchildrenchecked
    updatedIndeterminate[parentid] = !isAllchildrenchecked && !nonechildrenChecked;
    updateParents(parentid,updatedCheck,updatedIndeterminate)
  }
  function handleChange(e){
      let {checked,id} = e.target;
      let updatedCheck = {...checkedMap,[id]:checked};
      let updatedIndeterminate = {...indeterminateMap,[id]:false}
      const targetEle = findItem(defaultCheckboxData,id);
      if(!checked && targetEle){
        uncheckAllChildren(targetEle,updatedCheck)
      }
      else if(checked){
         checkAllChildren(targetEle,updatedCheck)
      }
      updateParents(id,updatedCheck,updatedIndeterminate)
      setChecked(updatedCheck)
      setIndeterminateMap(updatedIndeterminate);
  }
  function renderCheckbox(item,level=0){
    return (
      <div key={item.id} style={{marginLeft:level*20}}>
    <label>
    <input 
    type="checkbox"
    name={item.name}
    id = {item.id}
    checked = {checkedMap[item.id] || false}
    onChange = {(e)=>handleChange(e)}
    ref = {(el)=>{
    if(el) 
    el.indeterminate = indeterminateMap[item.id] ||false}}
    />
    {item.name}
    </label>
    {item.children && item.children.length>0 && 
    item.children.map((child)=>renderCheckbox(child,level+1))}
    </div>
    )
  }

  return (
    <div>
      {defaultCheckboxData?.map((item)=>renderCheckbox(item))}
    </div>
  );
}
