var map = L.map('map').setView([18.7357, -70.1627], 7); // Centro de la República Dominicana



// Mapa base claro (OpenStreetMap)
var mapLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Mapa oscuro (CartoDB Dark Matter)
var mapDarkCartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://carto.com/attribution">CARTO</a>'
});


// Vista satelital (Esri World Imagery)
var mapSatellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// Mapa de transporte público (CartoDB Positron)
var mapTransport = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
attribution: '&copy; <a href="https://carto.com/attribution">CARTO</a>'
});



// Mapa de calles detallado (Esri World Street Map)
var mapStreet = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri'
});




// Definir un objeto de capas base
var baseMaps = {
    "Claro": mapLight,
    "Oscuro (Estilo Google)": mapDarkCartoDB,
    "Vista Satelital": mapSatellite,
    "Vista mapStreet": mapStreet,
    "Vista mapTransport": mapTransport
    // Puedes añadir más capas base aquí
};

// Añadir control de capas base al mapa
L.control.layers(baseMaps).addTo(map);

// Ejemplo de ubicaciones de casas en alquiler
var locations = [
    { lat: 18.4861, lng: -69.9312, title: 'Casa en Santo Domingo' },
    { lat: 19.7570, lng: -70.7667, title: 'Casa en Santiago' },
    { lat: 18.533976342086266, lng: -69.84789351675421, title: 'Casa Don oscar' },
    { lat: 18.4741, lng: -69.9605, title: 'Casa en Boca Chica' },
    { latLng: [18.534530697687792, -69.84886578381361], title: 'Casa calle santo domingo' }, // Usando un formato alternativo
    { lat: 18.53448540777311, lng: -69.84922940831656, title: 'Casa en Calle Santo Domingo' }
];

locations.forEach(function(location) {
    var latLng;

    if ('lat' in location && 'lng' in location) {
        latLng = [location.lat, location.lng];
    } else if (location.latLng) {
        latLng = location.latLng;
    }

    if (latLng) {
        L.marker(latLng)
            .addTo(map)
            .bindPopup(location.title);
    }
});