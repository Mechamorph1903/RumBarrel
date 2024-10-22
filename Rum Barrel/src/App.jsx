import { useState } from 'react'
import './App.css'
import BrewList from './components/BrewList'
import AboutPage from './components/AboutPage'
import SearchPage from './components/SearchPage'

function App() {
  const [city, setCity] = useState('');
  const [display, setDisplay] = useState(false);
  const [home, setHome] = useState(true);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [about, setAbout] = useState(false);
  const [breweries, setBreweries] = useState([]);

  const openingPage = document.getElementById('openingPage');
  const landingPage = document.getElementById('landingPage');
  const callAPI = async (query) => {
    try{
      const response = await fetch(query);
    const json = await response.json();
    setBreweries(json);
    } catch (error) {
      console.error('Error fetching breweries', error);
    }
  };

  const startSearch = (e) => {
    if (city === '') {
      alert('Please enter a city');
      return;
    };

    e.preventDefault();
    callAPI(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}`);
    setDisplay(true);
    console.log(breweries);
  };

  const handleAbout = () => {
    setAbout(true);
    setHome(false);
    setSearch(false);

  }

  const handleSearch = () => {
    setSearch(true);
    setAbout(false);
    setHome(false);
  }

  const handleHome = () => {
    setHome(true);
    setAbout(false);
    setSearch(false);
  }

  return (
    <>
      {!display && <div id='openingPage'>
        <h1>Welcome to Rum Barrel🍺</h1>
        <h3>Your #1 Brewery Map</h3>

        <form action="">
          <label htmlFor="userInput">Please enter your current city to Kick things off</label>
          <br/>
          <input type="text" name="userInput" id="userInput" required onChange={(e) => {setCity(e.target.value)}}/>
          <br/>
          <button onClick={startSearch}>Find Near {city}</button>
        </form>
      </div>}

      {display && 
      <div id='landingPage'>
        <div className='sideMenu'>
          <h1>Rum Barrel🍻</h1>
          <ul>
            <li className='navBlist'><button className='navButton'onClick={handleHome}>Home🏡</button></li>
            <li className='navBlist'><button className='navButton'onClick={handleSearch}>Search 🔍</button></li>
            <li className='navBlist'><button className='navButton'onClick={handleAbout}>About ℹ️</button></li>
          </ul>
        </div>

        {home && <div className='centerPiece'>
          <div className='brewList'>
            <BrewList breweries={breweries} city={city}/>
          </div>
        </div>}

        {search && <SearchPage startSearch={callAPI}/>}

        {about && <AboutPage/>}
      </div>

      }
       
      
      

    </>
  )
}

export default App
