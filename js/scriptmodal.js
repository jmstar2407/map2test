// Variables globales
const modal = document.getElementById('propertyModal');
const modalDetails = document.getElementById('modalPropertyDetails');
const whatsappButton = document.getElementById('whatsappButton');
const mainImage = document.getElementById('currentImage');
const thumbnailsContainer = document.querySelector('.thumbnails');

// Abrir modal con la propiedad
function openModal(property) {
    setupWhatsappButton(property);
    updateModalDetails(property);
    updateGallery(property.imageFolder, property.imageCount);
    history.pushState(null, '', `#id-${property.id}`);
    modal.style.display = "block";
}

// Cerrar modal
function closeModal() {
    modal.style.display = "none";
    history.pushState(null, '', window.location.pathname); // Add this line
}

// Configurar botón de WhatsApp
function setupWhatsappButton(property) {
    const propertyLink = `https://tusitioweb.com/#id-${property.id}`;
    const whatsappMessage = `Me interesa saber más de esta propiedad con el ID ${property.id}: ${propertyLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=+18299605566&text=${encodeURIComponent(whatsappMessage)}`;
    whatsappButton.href = whatsappUrl;
}

// Actualizar detalles del modal
function updateModalDetails(property) {
    modalDetails.innerHTML = `
        <p>RD$ ${formatNumber(property.price)}.00</p>
        <h3>ID: ${property.id}</h3>
        <h4>${property.title}</h4>
        <div class="detallesmodalicon"> 
            ${createIconItem(roomIcon, `${property.rooms} Habitaciones`)}
            ${createIconItem(bathroomIcon, `${property.bathrooms} Baños`)}
            ${createIconItem(parkingIcon, `${property.parking} Parqueos`)}
            ${createIconItem(areaIcon, `${property.area} m²`)}
        </div>
        <div class="detallesmodaltext"> 
            <p><strong>Caracteristicas:</strong> ${property.caracteristicas}</p>
        </div>`;
}

// Crear un ítem de icono para los detalles
function createIconItem(icon, text) {
    return `
        <div class="item">
            <img src="${icon}"><p>${text}</p>
        </div>`;
}

// Actualizar galería
function updateGallery(imageFolder, imageCount) {
    let images = createImageArray(imageFolder, imageCount);
    clearGallery();
    addThumbnails(images);
    if (images.length > 0) {
        mainImage.src = images[0];
        updateActiveThumbnail(0);
    }
    setupGalleryNavigation(images);
    setupFullscreen(images);
}

// Crear array de imágenes
function createImageArray(imageFolder, imageCount) {
    return Array.from({ length: imageCount }, (_, i) => `${imageFolder}${i + 1}.jpg`);
}

// Limpiar galería
function clearGallery() {
    mainImage.src = '';
    thumbnailsContainer.innerHTML = '';
}

// Agregar miniaturas a la galería
function addThumbnails(images) {
    images.forEach((imgSrc, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = imgSrc;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.dataset.index = index;
        thumbnail.addEventListener('click', () => {
            mainImage.src = imgSrc;
            updateActiveThumbnail(index);
        });
        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Actualizar miniatura activa
function updateActiveThumbnail(index) {
    document.querySelectorAll('.thumbnails img').forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

// Navegación de la galería
function setupGalleryNavigation(images) {
    let currentIndex = 0;

    document.getElementById('prevMainImage').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentIndex];
        updateActiveThumbnail(currentIndex);
    });

    document.getElementById('nextMainImage').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        mainImage.src = images[currentIndex];
        updateActiveThumbnail(currentIndex);
    });
}

// Pantalla completa
function setupFullscreen(images) {
    const fullscreenModal = document.getElementById('fullscreenModal');
    const fullscreenImage = document.getElementById('fullscreenModalImage');
    let currentFullscreenIndex = 0;

    function openFullscreenModal(index) {
        currentFullscreenIndex = index;
        fullscreenImage.src = images[currentFullscreenIndex];
        fullscreenModal.style.display = 'block';
    }

    function closeFullscreenModal() {
        fullscreenModal.style.display = 'none';
    }

    document.querySelector('.close-fullscreen').addEventListener('click', closeFullscreenModal);
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            closeFullscreenModal();
        }
    });

    document.getElementById('prevFullscreenImage').addEventListener('click', () => {
        currentFullscreenIndex = (currentFullscreenIndex - 1 + images.length) % images.length;
        fullscreenImage.src = images[currentFullscreenIndex];
    });

    document.getElementById('nextFullscreenImage').addEventListener('click', () => {
        currentFullscreenIndex = (currentFullscreenIndex + 1) % images.length;
        fullscreenImage.src = images[currentFullscreenIndex];
    });

    mainImage.addEventListener('click', () => openFullscreenModal(currentFullscreenIndex));
}

// Verificar ID en la URL al cargar
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#id-')) {
        const propertyId = parseInt(hash.substring('#id-'.length));
        const property = [...alquileres, ...ventas].find(p => p.id === propertyId);
        if (property) {
            openModal(property);
        }
    }
});

// Desplazamiento de thumbnails
window.addEventListener('DOMContentLoaded', () => {
    const scrollLeftButton = document.querySelector('.scroll-button.left');
    const scrollRightButton = document.querySelector('.scroll-button.right');

    scrollLeftButton.addEventListener('click', () => {
        thumbnailsContainer.scrollLeft -= 150;
    });

    scrollRightButton.addEventListener('click', () => {
        thumbnailsContainer.scrollLeft += 150;
    });
});
