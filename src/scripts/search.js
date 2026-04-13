let currentAircraftData = [];

async function fetchLiveAircraft() {
  currentAircraftData = [
    { flightNumber: 'BA123', latitude: 51.5, longitude: -0.1, altitude: 35000, speed: 480, destination: 'JFK' },
    { flightNumber: 'EZY456', latitude: 53.4, longitude: -2.2, altitude: 28000, speed: 420, destination: 'BCN' },
    { flightNumber: 'RYR101', latitude: 55.9, longitude: -3.2, altitude: 32000, speed: 450, destination: 'DUB' },
    { flightNumber: 'BAW234', latitude: 52.1, longitude: -1.5, altitude: 37000, speed: 490, destination: 'LAX' },
    { flightNumber: 'EZY789', latitude: 50.9, longitude: -1.4, altitude: 24000, speed: 410, destination: 'AMS' },
    { flightNumber: 'RYR202', latitude: 54.6, longitude: -5.9, altitude: 31000, speed: 440, destination: 'MAD' },
    { flightNumber: 'TOM301', latitude: 53.8, longitude: -1.8, altitude: 33000, speed: 460, destination: 'PMI' },
    { flightNumber: 'BAW567', latitude: 51.1, longitude: 0.2, altitude: 38000, speed: 500, destination: 'SIN' },
    { flightNumber: 'EZY321', latitude: 56.4, longitude: -3.1, altitude: 26000, speed: 400, destination: 'CDG' },
    { flightNumber: 'RYR444', latitude: 52.6, longitude: -1.1, altitude: 29000, speed: 430, destination: 'FCO' },
    { flightNumber: 'BAW890', latitude: 51.8, longitude: -0.5, altitude: 36000, speed: 485, destination: 'ORD' },
    { flightNumber: 'VIR401', latitude: 50.6, longitude: -3.5, altitude: 34000, speed: 470, destination: 'JFK' },
    { flightNumber: 'EZY654', latitude: 57.1, longitude: -2.1, altitude: 22000, speed: 390, destination: 'LIS' },
    { flightNumber: 'TOM502', latitude: 53.2, longitude: -4.1, altitude: 30000, speed: 445, destination: 'TFS' },
    { flightNumber: 'BAW112', latitude: 51.3, longitude: -0.8, altitude: 39000, speed: 510, destination: 'HKG' },
    { flightNumber: 'RYR777', latitude: 54.0, longitude: -6.2, altitude: 27000, speed: 415, destination: 'AGP' },
    { flightNumber: 'EZY999', latitude: 52.9, longitude: -2.9, altitude: 25000, speed: 405, destination: 'MXP' },
    { flightNumber: 'BAW345', latitude: 51.6, longitude: 0.5, altitude: 37500, speed: 495, destination: 'BOS' },
    { flightNumber: 'TOM678', latitude: 55.0, longitude: -1.7, altitude: 31500, speed: 455, destination: 'HER' },
    { flightNumber: 'VIR202', latitude: 50.8, longitude: -2.0, altitude: 35500, speed: 475, destination: 'MCO' }
  ];
  console.log('Loaded ' + currentAircraftData.length + ' aircraft');
  filterAndRenderAircraft(parseInt(document.getElementById('range-slider').value));
}

function filterAndRenderAircraft(rangeKm) {
  const centre = map.getCenter();
  currentAircraftData.forEach(aircraft => {
    if (getDistanceKm(centre.lat, centre.lng, aircraft.latitude, aircraft.longitude) <= rangeKm)
      placeAircraftMarker(aircraft);
  });
}

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function searchFlight() {
  const query = document.getElementById('search-input').value.trim().toUpperCase();
  if (!query) { alert('Please enter a flight number.'); return; }
  const found = currentAircraftData.find(a => a.flightNumber === query);
  if (found) { panToAircraft(found.latitude, found.longitude); showFlightPanel(found); }
  else alert('No active flight found for ' + query);
}

function initSearch() {
  document.getElementById('search-btn').addEventListener('click', searchFlight);
  document.getElementById('search-input').addEventListener('keydown', e => { if (e.key === 'Enter') searchFlight(); });
  document.getElementById('range-slider').addEventListener('input', function() { filterAndRenderAircraft(parseInt(this.value)); });
  fetchLiveAircraft();
  setInterval(fetchLiveAircraft, 15000);
}