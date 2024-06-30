import React, { Component, useEffect, useState } from 'react'

import './App.css';

function App() {
const [country,setCountry]=useState([])
const [state,setState]=useState([])
const [city,setCity]=useState([]);
const [selectcountry,setselectcountry]=useState('')
const [selectstate,setselectstate]=useState('')
const [selectcity,setselectcity]=useState('')


const fetchCountry=async()=>{
  let url='https://crio-location-selector.onrender.com/countries';
  try{

    let res=await fetch(url);
    let data=await res.json();
    console.log(data)
    setCountry(data)
   
  }catch(e){
    console.log(e)
  }
}
const fetchState=async()=>{
  let url=`https://crio-location-selector.onrender.com/country=${selectcountry}/states`;
  try{

    let res=await fetch(url);
    let data=await res.json();
    console.log(data)
    setState(data)
   
  }catch(e){
    console.log(e)
  }
}
const fetchCity=async()=>{
  let url=`https://crio-location-selector.onrender.com/country=${selectcountry}/state=${selectstate}/cities`;
  try{
    let res=await fetch(url);
    let data=await res.json();
    console.log(data)
    setCity(data)
  }catch(e){
    console.log(e)
  }
}

useEffect(()=>{
if(selectcountry){
  fetchState();
  setselectcity('')
  setselectstate('')
}
},[selectcountry])

useEffect(()=>{
if(selectcountry &&selectstate){
  fetchCity()
  setselectcity('')
}
},[selectcountry,selectstate])

useEffect(()=>{
  fetchCountry()
},[])
  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="drop">
        <select value={selectcountry} onChange={(e)=>setselectcountry(e.target.value)} >
          <option value="" disabled>
            Select Country
          </option>
          {country.map((e)=>(
          <option value={e} key={e}>
             {e}
          </option>
          ))}
          
          
        </select>
        <select value={selectstate} onChange={(e)=>setselectstate(e.target.value)} disabled={!selectcountry}>
        <option value="" disabled>
            Select State
          </option>
          {state.map((e)=>(
          <option value={e} key={e}>
             {e}
          </option>
          ))}
        </select>

        <select value={selectcity} onChange={(e)=>setselectcity(e.target.value)} disabled={!selectstate} >
        <option value="" disabled>
            Select City
          </option>
          {city.map((e)=>(
          <option value={e} key={e}>
             {e}
          </option>
          ))}
        </select>
      </div>
      {selectcity && (
        <h2 style={{fontWeight:'500'}}>
          You selected <span style={{fontSize:'33px',fontWeight:'800'}}>{selectcity}</span>,<span style={{color:'grey',fontWeight:'400'}}>{' '}{selectstate}, {selectcountry}</span>
        </h2>
      )
      // ?<p>You Selected {selectcity}, {selectstate}, {selectcountry} </p>:''}
    }
    </div>
    // 9711778393
  );
}

export default App;
