function initSettings() {
  document.getElementById('toggle-planes').addEventListener('change', function () {
    if (this.checked) { clearAllMarkers(); }
    else { currentAircraftData.forEach(aircraft => placeAircraftMarker(aircraft)); }
  });
  document.getElementById('brightness-slider').addEventListener('input', function () {
    document.getElementById('map').style.filter = 'brightness(' + this.value + '%)';
  });
  document.getElementById('plane-size-slider').addEventListener('input', function () {
    planeSize = parseInt(this.value);
    currentAircraftData.forEach(aircraft => placeAircraftMarker(aircraft));
  });
  document.getElementById('toggle-hud').addEventListener('change', function () {
    const elements = ['#navbar', '#toolbar', '#flight-panel'];
    elements.forEach(sel => {
      document.querySelector(sel).style.visibility = this.checked ? 'hidden' : 'visible';
    });
  });
  document.addEventListener('keydown', () => {
    const hudToggle = document.getElementById('toggle-hud');
    if (hudToggle.checked) { hudToggle.checked = false; hudToggle.dispatchEvent(new Event('change')); }
  });
}
