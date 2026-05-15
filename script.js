alert("mapa funcionando");

var map = L.map('map').setView([-12.068, -77.08], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

L.marker([-12.068, -77.08])
  .addTo(map)
  .bindPopup("PUCP")
  .openPopup();
