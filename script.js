var map = L.map('map').setView([-12.068, -77.08], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var urlCSV =
"https://docs.google.com/spreadsheets/d/1enENlMc8MPCTFqNj_7ArIuHdWMeBn8np4aNMy4knyZw/export?format=csv&gid=530107837";

Papa.parse(urlCSV, {

    download: true,
    header: true,

    complete: function(results) {

        console.log(results.data);

        results.data.forEach(function(fila) {

            var lat = fila["latitud "];
            var lon = fila["longitud"];

            if(lat && lon) {

                lat = lat.replace(",", ".");
                lon = lon.replace(",", ".");

                lat = parseFloat(lat);
                lon = parseFloat(lon);

                if(!isNaN(lat) && !isNaN(lon)) {

                    var marker = L.marker([lat, lon]).addTo(map);

                    marker.bindPopup(
                        "<b>" + fila["Actividad"] + "</b><br>" +
                        fila["lugar"]
                    );

                }

            }

        });

    }

});
