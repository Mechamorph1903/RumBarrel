import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import BrewList from './components/BrewList'

function App() {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState('');
  const [breweries, setBreweries] = useState([]);

  const openingPage = document.getElementById('openingPage');
  const landingPage = document.getElementById('landingPage');
  const callAPI = async (query) => {
    try{
      const response = await fetch(query);
    const json = await response.json();
    console.log(json);
    setBreweries(json);
    } catch (error) {
      console.error('Error fetching breweries', error);
    }
  };

  const startSearch = (e) => {
    e.preventDefault()
    openingPage.classList.add('hide');
    landingPage.classList.remove('hide');
    callAPI(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=10`);
    console.log(breweries);
  };

  return (
    <>
      <div id='openingPage'>
        <h1>Welcome to Rum Barrel</h1>
        <h3>Your #1 Brewery Map</h3>

        <form action="">
          <label htmlFor="userInput">Please enter your current city to Kick things off</label>
          <br/>
          <input type="text" name="userInput" id="userInput" onChange={(e) => {setCity(e.target.value)}}/>
          <br/>
          <button onClick={startSearch}>Find Near {city}</button>
        </form>
      </div>


      <div className='hide' id='landingPage'>
        <div className='sideMenu'>
          <h1>Rum Barrel</h1>
          <ul>
            <li><button className='navButton'>Home🏡</button></li>
            <li><button className='navButton'>Search 🔍</button></li>
            <li><button className='navButton'>About ℹ️</button></li>
          </ul>
        </div>
        
        <div className='centerPiece'>
          <div className='info'>
            <div>Your City is: <br/> {city}</div>
            <div>There are <span>{breweries.length}</span> in {city.toUpperCase()}</div>
            <div></div>
          </div>
          <div className='brewList'>
            <BrewList breweries={breweries}/>
          </div>
        </div>
      </div>
       
      
      

    </>
  )
}

export default App
