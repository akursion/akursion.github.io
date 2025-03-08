let currentChapter = 1;
let currentImageIndex = 1;
let language = 'english';

// Define the number of images per chapter
const chapterImages = {
    english: {
        1: 23, // English Chapter 1 has 23 images
        2: 26, // English Chapter 2 has 26 images
        3: 18,
    },
    telugu: {
        1: 23, // Telugu Chapter 1 has 23 images
        2: 26, // Telugu Chapter 2 has 26 images
        3: 18,
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
    document.getElementById("page-counter").textContent = "";
    document.getElementById("next-chapter-button").classList.add("hidden");
}

// Function to load the current image
function loadImage() {
    const imagePath = `images/${language}_chapter${currentChapter}/image${currentImageIndex}.png`;
    document.getElementById("comic-image").src = imagePath;

    // Update the page counter
    document.getElementById("page-counter").textContent = `${currentImageIndex}/${chapterImages[language][currentChapter]} pages`;

    updateButtonStates();
    scrollToTop();
}

// Function to scroll to the top of the viewer on navigation
function scrollToTop() {
    document.getElementById("comic-viewer").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Navigate to the next image
function nextImage() {
    if (currentImageIndex < chapterImages[language][currentChapter]) {
        currentImageIndex++;
        loadImage();
    }
}

// Navigate to the previous image
function prevImage() {
    if (currentImageIndex > 1) {
        currentImageIndex--;
        loadImage();
    }
}

// Function to move to the next chapter
function nextChapter() {
    if (chapterImages[language][currentChapter + 1]) {
        openChapter(currentChapter + 1, language);
    } else {
        alert("No more chapters available.");
    }
}

// Update button states based on image index
function updateButtonStates() {
    const prevButton = document.querySelector('.nav-button:nth-of-type(1)');
    const nextButton = document.querySelector('.nav-button:nth-of-type(2)');
    const nextChapterButton = document.getElementById("next-chapter-button");

    prevButton.disabled = currentImageIndex === 1;
    nextButton.disabled = currentImageIndex >= chapterImages[language][currentChapter];

    // Show "Next Chapter" button only on the last page of the current chapter
    if (currentImageIndex === chapterImages[language][currentChapter]) {
        nextChapterButton.classList.remove("hidden");
    } else {
        nextChapterButton.classList.add("hidden");
    }
}
