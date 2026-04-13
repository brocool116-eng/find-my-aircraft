function showFlightPanel(aircraft) {
  document.getElementById('panel-flight-number').textContent = aircraft.flightNumber;
  document.getElementById('panel-altitude').textContent = aircraft.altitude?.toLocaleString() ?? '–';
  document.getElementById('panel-speed').textContent = aircraft.speed ?? '–';
  document.getElementById('panel-destination').textContent = aircraft.destination ?? '–';
  document.getElementById('flight-panel').classList.remove('hidden');
}

function hideFlightPanel() {
  document.getElementById('flight-panel').classList.add('hidden');
}

function initPanels() {
  const popups = {
    'btn-settings': 'settings-popup',
    'btn-weather':  'weather-popup',
    'btn-filters':  'filters-popup'
  };

  Object.entries(popups).forEach(([btnId, popupId]) => {
    document.getElementById(btnId).addEventListener('click', () => {
      document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));
      document.getElementById(popupId).classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.close-popup').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.popup').forEach(p => p.classList.add('hidden'));
    });
  });

  document.getElementById('close-panel').addEventListener('click', hideFlightPanel);

  const rangeSlider = document.getElementById('range-slider');
  rangeSlider.addEventListener('input', () => {
    document.getElementById('range-display').textContent = rangeSlider.value;
  });
}