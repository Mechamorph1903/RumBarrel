import React from "react";
import { useState, useEffect } from 'react';

const SearchPage = () => {

    const [breweries, setBreweries] = useState([]);
    const [clicked, setClicked] = useState(false);

    const startSearch = async (url) => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setBreweries(data);
          setClicked(true);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setBreweries([]);
          setClicked(true);
        }
      };
    
      // Function to handle form submission
      const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search').value;
        if (searchQuery) {
          const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${searchQuery}`;
          startSearch(url);  // Call the search function with the URL
        }
      };
    

    return(
        <div className="searchContainer">
            <div className="searchBar">
            <form action="" onSubmit={startSearch}>
                <input type="text" name="city" id="search" />
                <label htmlFor="city">Enter a city or </label>
                <button onClick={handleSearch}>Search</button>
            </form>
            </div>
           <div className="searchTable">
           {!clicked ? `Search for Something` : (breweries.length === 0 ? <h1>Sorry, no breweries found</h1> : <table>
            <thead>
                    <tr>
                    <th>Name</th>
                    <th>City, State</th>
                    <th>Type</th>
                    <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                {breweries.map((brewery, index) => {
                return(
                    <tr key={index} className='brewery'>
                        <td>{brewery.name}</td>
                        <td>{brewery.city}, {brewery.state}</td>
                        <td>{brewery.brewery_type}</td>
                        <td><a href={brewery.website_url === null ? "N/A": brewery.website_url}>{brewery.name}</a></td>
                    </tr>
                )
            })}
                </tbody>
           </table>)}
           </div>
        </div>
    )
}

export default SearchPage;