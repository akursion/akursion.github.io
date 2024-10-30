let currentChapter = 1;
let currentImageIndex = 1;

// Define the number of images per chapter
const chapterImages = {
  1: 4, // Chapter 1 has 4 images
  // 2: 4, // Uncomment if you add more chapters
  // 3: 6  // Uncomment if you add more chapters
};

// Function to open a chapter
function openChapter(chapterNumber) {
  console.log("Opening Chapter:", chapterNumber); // Debug: Check chapter number
  currentChapter = chapterNumber;
  currentImageIndex = 1; // Reset to the first image of the selected chapter
  document.getElementById("chapter-list").classList.add("hidden");
  document.getElementById("comic-viewer").classList.remove("hidden");
  document.getElementById("chapter-title").innerText = `Chapter ${chapterNumber}`;
  loadImage(); // Load the first image in the selected chapter
  updateButtonStates(); // Update button states on opening the chapter
}

// Function to close the viewer and return to the chapter list
function closeViewer() {
  document.getElementById("comic-viewer").classList.add("hidden");
  document.getElementById("chapter-list").classList.remove("hidden");
}

// Function to load the current image in the chapter
function loadImage() {
  const imagePath = `images/chapter${currentChapter}/image${currentImageIndex}.png`; // Changed .jpg to .png
  console.log("Loading image:", imagePath); // Debug: Check the image path
  document.getElementById("comic-image").src = imagePath; // Set the image source
  updateButtonStates(); // Update button states after loading image
  scrollToTop(); // Scroll to the top of the comic image
}

// Function to navigate to the next image
function nextImage() {
  currentImageIndex++;
  // Loop back to the last image if we reach the end of the chapter
  if (currentImageIndex > chapterImages[currentChapter]) {
    currentImageIndex = chapterImages[currentChapter]; // Set to last image
  }
  console.log("Next Image Index:", currentImageIndex); // Debug: Check new image index
  loadImage(); // Load the next image
}

// Function to navigate back to the previous image
function prevImage() {
  currentImageIndex--;
  // Loop back to the first image if we go before the first one
  if (currentImageIndex < 1) {
    currentImageIndex = 1; // Set to first image
  }
  console.log("Previous Image Index:", currentImageIndex); // Debug: Check previous image index
  loadImage(); // Load the previous image
}

// Function to update the states of the navigation buttons
function updateButtonStates() {
  const prevButton = document.querySelector('.nav-button:nth-of-type(1)'); // Previous button
  const nextButton = document.querySelector('.nav-button:nth-of-type(2)'); // Next button

  // Disable the previous button if on the first image
  if (currentImageIndex === 1) {
    prevButton.disabled = true;
    prevButton.style.backgroundColor = 'grey'; // Grey color for disabled state
  } else {
    prevButton.disabled = false;
    prevButton.style.backgroundColor = ''; // Reset to default
  }

  // Disable the next button if on the last image
  if (currentImageIndex >= chapterImages[currentChapter]) {
    nextButton.disabled = true;
    nextButton.style.backgroundColor = 'grey'; // Grey color for disabled state
  } else {
    nextButton.disabled = false;
    nextButton.style.backgroundColor = ''; // Reset to default
  }
}

// Function to scroll to the top of the comic image
function scrollToTop() {
  const comicContainer = document.getElementById("comic-container");
  comicContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
