import React, { useEffect, useState } from 'react';

function LocationsList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch locations from the Express API
    fetch('/api/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  console.log(locations);

  return (
    <div>
      <h2>Location List</h2>
      <ul>
        {locations.map((location) => (
          <li key={location._id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default LocationsList;
