import { useState } from "react";

export default function Accordion({ item, isOpen, onToggle }) {
  const [childActive, setChildActive] = useState(null);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div onClick={onToggle} style={{ cursor: "pointer" }}>
        {item.title}
      </div>

      {isOpen && (
        <div style={{ paddingLeft: "10px" }}>
          {item.children ? (
            item.children.map((child, idx) => (
              <Accordion
                key={child.id}
                item={child}
                isOpen={childActive === idx}
                onToggle={() =>
                  setChildActive((prev) => (prev === idx ? null : idx))
                }
              />
            ))
          ) : (
            <p>{item.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
