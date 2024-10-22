import React from "react";



const BrewList = ({breweries, city}) => {

    const typeCounts = breweries.reduce((acc, brewery) => {
        acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
        return acc;
    }, {});

    const sortedTypes = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);

    let mostCommonType = sortedTypes[0] ? sortedTypes[0][0].toUpperCase() : '';
    if (sortedTypes[1] && sortedTypes[0][1] === sortedTypes[1][1]) {
      mostCommonType = `${sortedTypes[0][0].toUpperCase()} & ${sortedTypes[1][0].toUpperCase()}`;
    }
  

    return(
        <>
            <div className='info'>
                <div>Your City is: <br/><span>{city.toUpperCase()}</span></div>
                <div>There are <br />
                <span>{breweries.length}</span> <br />
                in {city.toUpperCase()}</div>
                <div>
                    The Major types are:
                    <br />
                    <span>{mostCommonType}</span>
                {}
                </div>
            </div>
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