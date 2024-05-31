import React from 'react';
import './paragraph.css';

function Paragraph({info}) {
  return (
    <>
        <p className={info.selected === true ? "para selected_para" : "para" }>{info.name}</p>
    </>
  )
}

export default Paragraph