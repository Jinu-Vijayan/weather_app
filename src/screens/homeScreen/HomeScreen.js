import React, { useEffect, useRef, useState } from 'react'
import './homeScreen.css'
import cityNames from '../../utils/cityNames';
import Paragraph from '../../components/paragraph/Paragraph';
import TableRow from '../../components/tableRow/TableRow';

function HomeScreen() {

    const [cities, setCities] = useState(cityNames);
    const [weatherData, setWeatherData] = useState([]);

    const searchRef = useRef();

    function fetchWeatherData(cityName){
        const baseUrl = 'https://python3-dot-parul-arena-2.appspot.com/test?cityname=';

        fetch(`${baseUrl}${cityName}`)
        .then((res)=>res.json())
        .then((data)=>{
            setWeatherData((prev) => {
                data.city = cityName;
                data.high_light = false;
                const updatedData = [...prev,data];
                return updatedData;
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    function clickHandler(e){

        const filteredData = cities.filter((elem) => !elem.selected);
        const length = filteredData.length;

        if(length === 0){
            alert("No more data to show");
            return;
        }

        const randomIndex = Math.floor(Math.random()*length);
        const elemId = filteredData[randomIndex].id;
        const cityName = filteredData[randomIndex].name;
        fetchWeatherData(cityName);

        setCities((prev)=>{
            const data = [...prev];
            data.map((elem,index)=>{
                if(index === elemId - 1){
                    elem.selected = true;
                }
                return elem;
            })
            return data;
        })
    }

    function updateWeatherData(cityName,highLightState){
        setWeatherData((prev)=>{
            const data = [...prev];
            const updatedData = data.map((elem)=>{
                if(elem.city.toLowerCase() === cityName.toLowerCase()){
                    elem.high_light = highLightState;
                }
                return elem;
            });
            return updatedData
        });
    }

    function searchHandler(){

        const searchQuery = searchRef.current.value;
        const cityName = searchQuery;
        updateWeatherData(searchQuery,true);

        setTimeout(()=>{
            updateWeatherData(searchQuery,false);
        },3000);

        searchRef.current.value = "";
    }

  return (
    <main>
        <header>
            <h1>Jinu's Weather App</h1>
        </header>
        <div className='container'>
            <div className='left_container'>
                <button onClick={clickHandler}>Get Weather</button>
                <div>
                    <p>City</p>
                    {
                        cities.map((elem,index)=>{
                            return <Paragraph info={elem} key={index} />
                        })
                    }
                </div>
            </div>
            <div className='right_container'>
                <div className='search_box'>
                    <input ref={searchRef} type='text' placeholder='Enter city name' />
                    <button onClick={searchHandler}>Search</button>
                </div>
                <div className='table_container'>
                    <div className='table_header'>
                        <p>City</p>
                        <p>Description</p>
                        <p>Temperature(C)</p>
                        <p>Pressure(hpa)</p>
                        <p>Data age(hr)</p>
                        <p></p>
                    </div>
                    <div className='table_body'>
                        {
                            weatherData.length > 0 ? (
                                weatherData.map((elem,index) => {
                                    return <TableRow info={elem} key={index} id={index} setInfo = {setWeatherData} setCities = {setCities}/>
                                })
                            ) : (
                                <p className='empty_message'>No Data</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default HomeScreen