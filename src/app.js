const dummyAircraftData = [
  { flightNumber: "BA123", latitude: 51.5, longitude: -0.1, altitude: 35000, speed: 480, destination: "JFK", heading: 270 },
  { flightNumber: "EZY456", latitude: 53.4, longitude: -2.2, altitude: 28000, speed: 420, destination: "BCN", heading: 180 },
  { flightNumber: "RYR789", latitude: null, longitude: null, altitude: null, speed: 0, destination: "DUB", heading: 0 }
];

document.addEventListener('DOMContentLoaded', () => {
  console.log('Find My Aircraft — initialising...');
  initMap();
  dummyAircraftData.forEach(aircraft => placeAircraftMarker(aircraft));
  initPanels();
  initSettings();
  initSearch();
  console.log('Initialisation complete.');
});