let currentAircraftData = [];

async function fetchLiveAircraft() {
  try {
    const response = await fetch('https://api.adsb.lol/v2/lat/54.5/lon/-3.0/dist/500');
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    currentAircraftData = data.ac
      .filter(a => a.lat && a.lon)
      .map(a => ({
        flightNumber: (a.flight || a.hex || 'Unknown').trim(),
        latitude: a.lat,
        longitude: a.lon,
        altitude: a.alt_baro ? Math.round(a.alt_baro) : 0,
        speed: a.gs ? Math.round(a.gs) : 0,
        destination: 'N/A'
      }));
    console.log('Loaded ' + currentAircraftData.length + ' aircraft from ADSB.lol');
  } catch (err) {
    console.warn('ADSB fetch failed, using dummy data:', err);
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