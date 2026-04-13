document.addEventListener("DOMContentLoaded", () => {
  console.log("Find My Aircraft initialising");
  initMap();
  initPanels();
  initSettings();
  initSearch();
  initWeather();
  initLogin();
  console.log("Initialisation complete.");
});