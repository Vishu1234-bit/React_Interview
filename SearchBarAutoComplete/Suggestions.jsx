import React from 'react';

const styles = {
  item: {
    padding: 5,
    cursor: 'pointer',
  },
};

function Suggestions({ suggestions, activeIndex, handleSelect }) {
  if (!suggestions.length) return null;
  return (
    <ul>
      {suggestions.map((item, index) => (
        <li
          key={index}
          onClick={() => handleSelect(item)}
          style={{
            ...styles.item,
            backgroundColor: index === activeIndex ? '#eee' : '#fff',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default Suggestions;
