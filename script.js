let currentChapter = 1;
let currentImageIndex = 1;
let language = 'english';

// Define the number of images per chapter
const chapterImages = {
    english: {
        1: 23, // English Chapter 1 has 4 images
        2: 3, // English Chapter 2 has 3 images
    },
    telugu: {
        1: 23, // Telugu Chapter 1 has 4 images
        2: 3, // Telugu Chapter 2 has 3 images
    }
};

// Function to open a chapter
function openChapter(chapterNumber, selectedLanguage) {
    currentChapter = chapterNumber;
    language = selectedLanguage;
    currentImageIndex = 1;
    document.getElementById("header").style.display = "none";
    document.getElementById("chapter-list").classList.add("hidden");
    document.getElementById("comic-viewer").classList.remove("hidden");
    loadImage();
}

// Function to return to the home page
function backToHome() {
    document.getElementById("comic-viewer").classList.add("hidden");
    document.getElementById("header").style.display = "block";
    document.getElementById("chapter-list").classList.remove("hidden");
    currentImageIndex = 1;
    document.getElementById("comic-image").src = "";
}

// Function to load the current image
function loadImage() {
    const imagePath = `images/${language}_chapter${currentChapter}/image${currentImageIndex}.png`;
    document.getElementById("comic-image").src = imagePath;
    updateButtonStates();
    scrollToTop();
}

// Function to scroll to the top of the viewer on navigation
function scrollToTop() {
    document.getElementById("comic-viewer").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Navigate to the next image
function nextImage() {
    currentImageIndex++;
    if (currentImageIndex > chapterImages[language][currentChapter]) {
        currentImageIndex = chapterImages[language][currentChapter];
    }
    loadImage();
}

// Navigate to the previous image
function prevImage() {
    currentImageIndex--;
    if (currentImageIndex < 1) {
        currentImageIndex = 1;
    }
    loadImage();
}

// Update button states based on image index
function updateButtonStates() {
    const prevButton = document.querySelector('.nav-button:nth-of-type(1)');
    const nextButton = document.querySelector('.nav-button:nth-of-type(2)');
    
    prevButton.disabled = currentImageIndex === 1;
    nextButton.disabled = currentImageIndex >= chapterImages[language][currentChapter];
}
