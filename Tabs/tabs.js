import {useState} from "react";
export default function Tabs() {
  const [active,setActive] = useState(0)
  function changeState(e){
    e.preventDefault();
    setActive(Number(e.target.name));
  }
  return (
    <div>
      <div className='tabs'>
        <button name='0' 
        onClick={changeState}
        className = {active===0 ? 'active-tab':'normal-tab'}>HTML</button>
        <button name='1' 
        onClick={changeState}
        className = {active===1 ? 'active-tab':'normal-tab'}>CSS</button>
        <button name='2' 
        onClick={changeState}
        className = {active===2 ? 'active-tab':'normal-tab'}>JavaScript</button>
      </div>
      <div>
        {active===0 && <p>
          The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.
        </p>}
        {active===1 && <p>
          Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.
        </p>}
        {active===2 && <p>
          JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.
        </p>}
      </div>
    </div>
  );
}
