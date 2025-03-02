import {useState} from "react";
export default function Accordion() {
  const [expanded,setExpanded] = useState(null);
  function toggleAccordion(index){
    setExpanded((prevIndex)=>prevIndex===index?null:index);
  }
  const sections = [
    {
      name: "HTML",
      desc: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
     {
      name: "CSS",
      desc: " Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
      name: "JavaScript",
      desc: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
    }
  ]
  return (
    <div>
    {sections.map((section,index)=> (
      <div key={index}>
        <div onClick = {()=>toggleAccordion(index)}>
          {section.name}{" "}
          <span
            aria-hidden={true}
            className={expanded==index?"accordion-icon":"accordion-icon--rotated"}
          />
        </div>
        {expanded==index && <div>
         {section.desc}
        </div>}
      </div>
      ))}
    </div>
  );
}
