import React from "react";
import { useState, useEffect } from 'react';

const SearchPage = () => {

    const [breweries, setBreweries] = useState([]);
    const [brewType, setBrewType] = useState('');
    const [stateFilter, setStateFilter] = useState('');
    const [filterStateChecked, setFilterStateChecked] = useState(false);
    const [filteredBreweries, setFilteredBreweries] = useState(breweries);
    const [normalOrFiltered, setNormalOrFiltered] = useState(false);
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

    const filterBreweries = () => {
        let filtered = breweries;
      
        if (brewType) {
          filtered = filtered.filter(brewery => brewery.brewery_type === brewType);
        }
      
        if (filterStateChecked && stateFilter) {
          filtered = filtered.filter(brewery => brewery.state.toLowerCase() === stateFilter.toLowerCase());
        }
      
        setFilteredBreweries(filtered);
      };
    
      // Function to handle form submission
      const handleSearch = (e) => {
        e.preventDefault();
        const searchQuery = document.getElementById('search').value;
        if (searchQuery ) {
          const url = `https://api.openbrewerydb.org/v1/breweries/search?query=${searchQuery}`;
          startSearch(url);
          if(normalOrFiltered){
            filterBreweries();
          }
        } else {
            filterBreweries();
        }

      };
    

    return(
        <div className="searchContainer">
            <div className="searchBar">
                <form>
                    <div className="searchSection">
                        <label htmlFor="city" style={{ marginRight: "10px" }}>Search:</label>
                        <input type="text" name="city" id="search" placeholder="Enter a brewery or city" />
                        <button type="submit" style={{ marginLeft: "10px" }} onClick={handleSearch}>Search</button>
                        <label>
                        Type of Search:
                            <select name="" id="" value={normalOrFiltered}
  onChange={(e) => setNormalOrFiltered(e.target.value)}>
                                <option value="">Select</option>
                                <option value="false">Normal Search</option>
                                <option value="true">Filter Search</option>
                            </select>
                        </label>
                    </div>

                    <div className="filterSection">
                        <label htmlFor="brew_Type" style={{ display: "block", marginBottom: "10px" }}>
                            Type:
                            <select id="brew_Type" name="brew_Type" style={{ marginLeft: "10px" }} value={brewType}
  onChange={(e) => setBrewType(e.target.value)}>
                                <option value="">Select Type</option>
                                <option value="micro">Micro</option>
                                <option value="nano">Nano</option>
                                <option value="regional">Regional</option>
                                <option value="brewpub">Brewpub</option>
                                <option value="large">Large</option>
                                <option value="planning">Planning</option>
                                <option value="bar">Bar</option>
                                <option value="contract">Contract</option>
                                <option value="proprietor">Proprietor</option>
                                <option value="closed">Closed</option>
                            </select>
                        </label>

                        <label htmlFor="stateFilter" style={{ display: "block", marginBottom: "10px" }}>
                            <input type="checkbox" name="filterState" id="filterState"   checked={filterStateChecked}
  onChange={(e) => setFilterStateChecked(e.target.checked)}/>
                            State:
                            <input type="text" name="state" id="stateFilter" placeholder="Enter the state" style={{ marginLeft: "10px" }}  value={stateFilter}
  onChange={(e) => setStateFilter(e.target.value)}/>
                        </label>
                    </div>
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
                {normalOrFiltered ? filteredBreweries.map((brewery, index) => {
                    return(
                        <tr key={index} className='brewery'>
                        <td>{brewery.name}</td>
                        <td>{brewery.city}, {brewery.state}</td>
                        <td>{brewery.brewery_type}</td>
                        <td><a href={brewery.website_url === null ? "N/A": brewery.website_url}>{brewery.name}</a></td>
                    </tr>
                    )
                } ): breweries.map((brewery, index) => {
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