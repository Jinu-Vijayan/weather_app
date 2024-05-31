import React from 'react';
import './tableRow.css';

function TableRow({info,id,setInfo,setCities}) {

    function changeHandler(e){
        setInfo((prev)=>{
            const data = [...prev];
            const updatedData = data.map((elem,index)=>{
                if(index === id){
                    elem.description = e.target.value;
                }
                return elem;
            })
            return updatedData;
        })
    }

    function clickHandler(){
        setInfo((prev)=>{
            const data = [...prev];
            const updatedData = data.filter((elem,index) => !(index === id));
            return updatedData;
        });

        setCities((prev)=>{
            const data = [...prev];
            const updatedData = data.map((elem,index)=>{
                if(elem.name === info.city){
                    elem.selected = false;
                }
                return elem;
            });
            return updatedData;
        })
    }

    const timeDifferenceMs = new Date() - new Date(info.date_and_time);
    const timeDifferenceHours = Math.floor(timeDifferenceMs/3600000);

  return (
    <div className={info.high_light === false ? 'table_row' : "table_row high_light"}>
        <p>{info.city}</p>
        <p><input type='text' value={info.description} onChange={changeHandler}/></p>
        <p>{info.temp_in_celsius}</p>
        <p>{info.pressure_in_hPa}</p>
        <p>{timeDifferenceHours}</p>
        <p><button onClick={clickHandler}>Delete</button></p>
    </div>
  )
}


export default TableRow