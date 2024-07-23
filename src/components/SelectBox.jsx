import React from 'react';
import "../index.css";

const SelectBox = ({ box, value, setValue, toggleBox, isOrigin, isCabin }) => {
  let options = [];

  if (isOrigin) {
    options = ["DEL", "JFK", "BOM", "BNE", "BLR", "SYD"];
  } else if (isCabin) {
    options = ["Economy", "Business", "First"];
  } else {
    options = ["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"];
  }
  
  const handleOptionClick = (option) => {
    setValue(option);
    toggleBox(); 
  };

  const selectBoxStyle = {
    backgroundColor: isCabin ? "#292b28" : "",
    boxShadow: isCabin ? "none" : ""
  };

  return (
    <div className="selectBox" style={selectBoxStyle}>
      <div onClick={toggleBox}>
        <span className="selectBox_heading">
          {isOrigin ? "Origin" : isCabin ? "Cabin Class" : "Destination"}
        </span>
        <span className={`arrow ${box ? 'rotate_180' : ''}`}>▼</span>
        <div className="option">{value}</div>
      </div>
      {isCabin && <div className={box ? 'white_line_open' : 'white_line_close'}></div>}
      {box && (
          <>
          {options.map(option => (
            <div 
              key={option} 
              className="options" 
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default SelectBox;
