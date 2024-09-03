// Cargar datos de alquileres y ventas desde archivos JSON
function loadLocations(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => data.map(normalizeLocation));
}

// Función para inicializar y cargar los marcadores
function initializeMarkers() {
    Promise.all([
        loadLocations('./alquileres.json'),
        loadLocations('./ventas.json')
    ]).then(([alquileres, ventas]) => {
        var alquilerMarkers = [];
        var ventaMarkers = [];

        createMarkers(alquileres, alquilerMarkers);
        createMarkers(ventas, ventaMarkers);

        // Inicialmente mostrar solo los alquileres
        toggleMarkers('alquiler');
    });
}

// Inicializa los marcadores después de que el documento esté cargado
document.addEventListener('DOMContentLoaded', initializeMarkers);
