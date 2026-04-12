// app.js — Entry point. Initialises everything and loads test data.

// ===== DUMMY TEST DATA =====
// Used in Phase 2 to test map rendering before live API is integrated.
// This matches the test data table in my design document.
const dummyAircraftData = [
  {
    flightNumber: "BA123",
    latitude: 51.5,
    longitude: -0.1,
    altitude: 35000,
    speed: 480,
    destination: "JFK",
    heading: 270
  },
  {
    flightNumber: "EZY456",
    latitude: 53.4,
    longitude: -2.2,
    altitude: 28000,
    speed: 420,
    destination: "BCN",
    heading: 180
  },
  {
    flightNumber: "RYR789",
    latitude: 55.9,
    longitude: -3.2,
    altitude: null,    // Intentionally null — tests the null-check in placeAircraftMarker
    longitude: null,
    speed: 0,
    destination: "DUB",
    heading: 0
  }
];

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Find My Aircraft — initialising...');

  // 1. Start the map
  initMap();

  // 2. Load dummy aircraft (will be replaced by API in Phase 4)
  dummyAircraftData.forEach(aircraft => placeAircraftMarker(aircraft));

  // 3. Set up panel buttons and popups
  initPanels();

  // 4. Set up settings controls
  initSettings();

  // 5. Set up search
  initSearch();

  console.log('Initialisation complete.');
});