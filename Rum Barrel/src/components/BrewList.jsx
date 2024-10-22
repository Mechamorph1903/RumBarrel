import React from "react";



const BrewList = ({breweries}) => {

    return(
        <>
            <div className="brewries">
            {breweries.length === 0 ? <h1>Sorry, no breweries found</h1> :
            <table>
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
           
           </table>}
            </div>
        </>
    )
}

export default BrewList;