import React from "react";



const BrewList = ({breweries}) => {

    return(
        <>
            <div>
                <form action="">
                    <input type="text" name="" id="" />
                    <label htmlFor="filters"></label>
                    <div id="filters">
                       <label htmlFor="">
                       <input type="radio" name="State" id="" />
                       State 
                       </label>
                       <label htmlFor="">
                       <input type="radio" name="State" id="" />
                       country 
                       </label>
                    </div>
                    <button>Search</button>
                </form>
            </div>
            <div><ul>
            {breweries.map((brewery, index) => {
                return(
                    <li key={index} className='brewery'>
                        <h3>{brewery.name}</h3>
                        <p>{brewery.city}, {brewery.state}</p>
                        <p>{brewery.street}</p>
                        <p>{brewery.phone}</p>
                    </li>
                )
            })}</ul></div>
        </>
    )
}

export default BrewList;