document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const currentImage = document.getElementById('currentImage');
    const fullscreenView = document.getElementById('fullscreenView');
    const fullscreenImageContainer = document.getElementById('fullscreenImageContainer');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const closeFullscreen = document.getElementById('closeFullscreen');
    const prevImage = document.getElementById('prevImage');
    const nextImage = document.getElementById('nextImage');
    let currentIndex = 0;
    const prevMainImageBtn = document.getElementById('prevMainImage');
    const nextMainImageBtn = document.getElementById('nextMainImage');
    
    

    prevMainImageBtn.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateMainImage();
    });

    nextMainImageBtn.addEventListener('click', function () {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateMainImage();
    });

    function updateMainImage() {
        currentImage.src = thumbnails[currentIndex].getAttribute('data-full');
        thumbnails.forEach(function(img) {
            img.classList.remove('active');
        });
        thumbnails[currentIndex].classList.add('active');
    }

    thumbnails.forEach(function(thumbnail, index) {
        thumbnail.addEventListener('click', function () {
            currentImage.src = this.getAttribute('data-full');
            currentIndex = index;

            thumbnails.forEach(function(img) {
                img.classList.remove('active');
            });

            this.classList.add('active');
        });const thumbnailsContainer = document.querySelector('.thumbnails-container');
const thumbnails = document.querySelector('.thumbnails');   

const scrollLeftButton = document.querySelector('.scroll-button.left');
const scrollRightButton = document.querySelector('.scroll-button.right');   


scrollLeftButton.addEventListener('click', () => {
thumbnails.scrollLeft -= 150; // Ajusta la cantidad de desplazamiento según tus necesidades
});

scrollRightButton.addEventListener('click', () => {
thumbnails.scrollLeft += 150; 
});
    });

    currentImage.addEventListener('click', function () {
        fullscreenImage.src = this.src;
        fullscreenView.style.display = 'flex';
    });

    closeFullscreen.addEventListener('click', function () {
        fullscreenView.style.display = 'none';
        fullscreenImage.style.transform = 'scale(1) translate(-50%, -50%)';
        fullscreenImageContainer.style.left = '0';
        fullscreenImageContainer.style.top = '0';
    });

    prevImage.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbnails.length - 1;
        updateFullscreenImage();
    });

    nextImage.addEventListener('click', function () {
        currentIndex = (currentIndex < thumbnails.length - 1) ? currentIndex + 1 : 0;
        updateFullscreenImage();
    });

    function updateFullscreenImage() {
        fullscreenImage.src = thumbnails[currentIndex].getAttribute('data-full');
        thumbnails.forEach(function(img) {
            img.classList.remove('active');
        });
        thumbnails[currentIndex].classList.add('active');
    }

    let zoomLevel = 1;
    let isZooming = false;

    fullscreenImage.addEventListener('wheel', function (e) {
        e.preventDefault(); 

        if (e.ctrlKey) { 
            isZooming = true;
            if (e.deltaY < 0) {
                zoomLevel += 0.1;
            } else {
                zoomLevel -= 0.1;
            }

            zoomLevel = Math.max(1, Math.min(3, zoomLevel)); 
            fullscreenImage.style.transform = `scale(${zoomLevel}) translate(-50%, -50%)`;
        }
    });

    fullscreenImage.addEventListener('mousedown', function (event) {
if (isZooming) {
    isZooming = false;
    return; 
}

let startX = event.clientX;
let startY = event.clientY;
let initialLeft = parseInt(fullscreenImage.style.left) || 0;
let initialTop = parseInt(fullscreenImage.style.top) || 0;

function drag(e) {
    let deltaX = e.clientX - startX;
    let deltaY = e.clientY - startY;

    let newLeft = initialLeft + deltaX;
    let newTop = initialTop + deltaY;

    // Restricciones para no salir del contenedor
    let maxLeft = 0;
    let maxTop = 0;
    let minLeft = fullscreenImageContainer.clientWidth - fullscreenImage.clientWidth * zoomLevel;
    let minTop = fullscreenImageContainer.clientHeight - fullscreenImage.clientHeight * zoomLevel;

    // Aplicar restricciones
    if (newLeft > maxLeft) {
        newLeft = maxLeft;
    } else if (newLeft < minLeft) {
        newLeft = minLeft;
    }

    if (newTop > maxTop) {
        newTop = maxTop;
    } else if (newTop < minTop) {
        newTop = minTop;
    }

    fullscreenImage.style.left = newLeft + 'px';
    fullscreenImage.style.top = newTop + 'px';
}


});


fullscreenImage.addEventListener('click', function () {
    if (zoomLevel === 1) {
        zoomLevel = 2; 
    } else {
        zoomLevel = 1; 
    }

    // Centrar la imagen siempre que cambie el zoom
    this.style.transform = `scale(${zoomLevel}) translate(-50%, -50%)`;
    fullscreenImageContainer.style.left = '0';
    fullscreenImageContainer.style.top = '0';
});
});



