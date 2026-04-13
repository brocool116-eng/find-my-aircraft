let currentAircraftData = [];

async function fetchLiveAircraft() {
  try {
    const response = await fetch('https://opensky-network.org/api/states/all?lamin=49.5&lomin=-8.0&lamax=61.0&lomax=2.0');
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    currentAircraftData = data.states
      .filter(s => s[5] && s[6])
      .map(s => ({
        flightNumber: (s[1] || 'Unknown').trim(),
        latitude: s[6],
        longitude: s[5],
        altitude: s[7] ? Math.round(s[7] * 3.281) : 0,
        speed: s[9] ? Math.round(s[9] * 1.944) : 0,
        destination: 'N/A'
      }));
    console.log('Loaded ' + currentAircraftData.length + ' aircraft from OpenSky');
  } catch (err) {
    console.warn('OpenSky fetch failed, using dummy data:', err);
    currentAircraftData = [
      { flightNumber: 'BA123', latitude: 51.5, longitude: -0.1, altitude: 35000, speed: 480, destination: 'JFK' },
      { flightNumber: 'EZY456', latitude: 53.4, longitude: -2.2, altitude: 28000, speed: 420, destination: 'BCN' },
      { flightNumber: 'RYR101', latitude: 55.9, longitude: -3.2, altitude: 32000, speed: 450, destination: 'DUB' }
    ];
  }
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