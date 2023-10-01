import React, { useEffect, useState } from 'react';

function LocationsList() {
  const [locations, setLocations] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: '',
  });

  useEffect(() => {
    // Fetch locations from the Express API
    fetch('/api/locations')
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedLocations = [...locations].sort((a, b) => {
        if (sortConfig.direction === 'ascending') {
            return a[sortConfig.key].localeCompare(b[sortConfig.key]);
        } else {
            return b[sortConfig.key].localeCompare(a[sortConfig.key]);
        }
    });

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th onClick={() => handleSort('name')}>Name</th>
                    <th onClick={() => handleSort('type')}>Type</th>
                    <th onClick={() => handleSort('country')}>Country</th>
                    <th onClick={() => handleSort('longitude')}>Longitude</th>
                    <th onClick={() => handleSort('latitude')}>Latitude</th>
                    <th onClick={() => handleSort('lastVisited')}>Last Visited</th>
                </tr>
                </thead>
                <tbody>
                {sortedLocations.map((location, index) => (
                    <tr key={index}>
                        <td>{location.name}</td>
                        <td>{location.type}</td>
                        <td>{location.country}</td>
                        <td>{location.coordinates[0]}</td>
                        <td>{location.coordinates[1]}</td>
                        <td>{location.visited.length > 0 ? location.visited.slice(-1)[0] : ''}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default LocationsList;
