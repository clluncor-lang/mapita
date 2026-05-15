var map = L.map('map').setView([-12.068, -77.08], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

var urlCSV =
"https://docs.google.com/spreadsheets/d/1enENlMc8MPCTFqNj_7ArIuHdWMeBn8np4aNMy4knyZw/export?format=csv&gid=530107837";

var capaMarkers = L.layerGroup().addTo(map);

function convertirLinkDrive(url) {

  if (!url) return "";

  var match = url.match(/\/d\/(.*?)\//);

  if (match && match[1]) {

    return "https://drive.google.com/uc?export=view&id=" + match[1];

  }

  return url;
}

Papa.parse(urlCSV, {

  download: true,
  header: true,

  complete: function(results) {

    console.log(results.data);

    results.data.forEach(function(fila) {

      // IMPORTANTE
      var lat = fila["latitud "];
      var lon = fila["longitud"];

      if (!lat || !lon) return;

      lat = lat.replace(",", ".");
      lon = lon.replace(",", ".");

      lat = parseFloat(lat);
      lon = parseFloat(lon);

      if (isNaN(lat) || isNaN(lon)) return;

      var foto = fila["Foto"] || "";

      foto = convertirLinkDrive(foto);

      var popup = `
        <div style="width:250px">

        <h3>
        ${fila["Actividad"] || ""}
        </h3>

        <b>Lugar:</b><br>
        ${fila["lugar"] || ""}

        <br><br>

        <b>Mes:</b><br>
        ${fila["Mes"] || ""}

        <br><br>

        <b>Comentario:</b><br>
        ${fila["comentario "] || ""}

        <br><br>
      `;

      if (foto !== "") {

        popup += `
          <img
          src="${foto}"
          style="
          width:100%;
          border-radius:10px;
          ">
        `;
      }

      popup += `</div>`;

      var marker =
      L.marker([lat, lon]);

      marker.bindPopup(popup);

      capaMarkers.addLayer(marker);

    });

  }

});
