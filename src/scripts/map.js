// map.js — Handles Leaflet map initialisation and aircraft markers

// Store map and markers globally so other modules can access them
let map;
let markers = {};  // Object: { flightNumber: leafletMarkerObject }
let planeSize = 20; // Default plane icon size in pixels

/**
 * Initialises the Leaflet map centred on the UK.
 * Called once from app.js on page load.
 */
function initMap() {
  // Create the map, centred on UK coordinates
  map = L.map('map', {
    center: [54.5, -3.0],  // UK centre (latitude, longitude)
    zoom: 6,
    zoomControl: false     // We add our own zoom buttons in the HTML later
  });

  // Add the OpenStreetMap tile layer (free, no API key needed)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(map);

  // Re-add zoom control to bottom-right so it doesn't overlap navbar
  L.control.zoom({ position: 'bottomright' }).addTo(map);

  console.log('Map initialised successfully');
}

/**
 * Creates or updates an aircraft marker on the map.
 * @param {Object} aircraft - Aircraft data object
 * @param {string} aircraft.flightNumber - Unique flight identifier
 * @param {number} aircraft.latitude - Latitude coordinate
 * @param {number} aircraft.longitude - Longitude coordinate
 * @param {number} aircraft.altitude - Altitude in feet
 * @param {number} aircraft.speed - Speed in knots
 * @param {string} aircraft.destination - Destination airport code
 */
function placeAircraftMarker(aircraft) {
  // Validation: skip aircraft with no position data
  if (aircraft.latitude === null || aircraft.longitude === null) {
    console.warn(`Skipping ${aircraft.flightNumber}: no position data`);
    return;
  }

  // Create a custom HTML icon (✈ emoji sized by planeSize variable)
  const icon = L.divIcon({
    html: `<div style="font-size:${planeSize}px; transform:rotate(${aircraft.heading || 0}deg);">✈</div>`,
    className: '',
    iconAnchor: [planeSize / 2, planeSize / 2]
  });

  if (markers[aircraft.flightNumber]) {
    // Marker already exists — update position (iterative update)
    markers[aircraft.flightNumber].setLatLng([aircraft.latitude, aircraft.longitude]);
    markers[aircraft.flightNumber].setIcon(icon);
  } else {
    // New marker — create it and add click handler for flight panel
    const marker = L.marker([aircraft.latitude, aircraft.longitude], { icon })
      .addTo(map)
      .on('click', () => showFlightPanel(aircraft));

    markers[aircraft.flightNumber] = marker;
  }
}

/**
 * Removes all markers from the map and clears the markers object.
 * Used by the Settings panel "Hide all plane icons" toggle.
 */
function clearAllMarkers() {
  Object.values(markers).forEach(marker => map.removeLayer(marker));
  markers = {};
}

/**
 * Pans the map to centre on a specific aircraft.
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 */
function panToAircraft(lat, lng) {
  map.setView([lat, lng], 8, { animate: true });
}
