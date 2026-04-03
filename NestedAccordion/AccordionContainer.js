import "./styles.css";
import Accordion from "./Accordion";
import { useState } from "react";
export default function AccordionContainer() {
  const data = [
    {
      id: "1",
      title: "Accordion1",
      children: [
        {
          id: "c1",
          title: "ChildAccordion1",
          description: "Content of ChildAccordion1",
        },
      ],
    },
    {
      id: "2",
      title: "Accordion2",
      children: [
        {
          id: "c2",
          title: "ChildAccordion2",
          description: "Content of ChildAccordion2",
        },
      ],
    },
    {
      id: "3",
      title: "Accordion3",
      description: "Content of Accordion3",
    },
  ];
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };
  return (
    <div>
      {data?.map((item, index) => (
        <Accordion
          key={item.id}
          item={item}
          isOpen={activeIndex === index}
          onToggle={() => toggle(index)}
        />
      ))}
    </div>
  );
}
