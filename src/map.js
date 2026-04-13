let map;
let markers = {};
let planeSize = 32;

function initMap() {
  map = L.map('map', {
    center: [54.5, -3.0],
    zoom: 6,
    zoomControl: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  console.log('Map initialised successfully');
}

function placeAircraftMarker(aircraft) {
  if (aircraft.latitude === null || aircraft.longitude === null) {
    console.warn(`Skipping ${aircraft.flightNumber}: no position data`);
    return;
  }

  const icon = L.divIcon({
    html: '<p style="color:#00ff88; font-size:30px; margin:0; text-shadow: 0 0 6px black, 0 0 6px black;">✈</p>',
    className: '',
    iconAnchor: [15, 15]
  });

  if (markers[aircraft.flightNumber]) {
    markers[aircraft.flightNumber].setLatLng([aircraft.latitude, aircraft.longitude]);
    markers[aircraft.flightNumber].setIcon(icon);
  } else {
    const marker = L.marker([aircraft.latitude, aircraft.longitude], { icon })
      .addTo(map)
      .on('click', () => showFlightPanel(aircraft));
    markers[aircraft.flightNumber] = marker;
  }
}

function clearAllMarkers() {
  Object.values(markers).forEach(marker => map.removeLayer(marker));
  markers = {};
}

function panToAircraft(lat, lng) {
  map.setView([lat, lng], 8, { animate: true });
}