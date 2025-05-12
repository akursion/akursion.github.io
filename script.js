let currentChapter = 1;
let currentImageIndex = 1;
let language = 'english';
let isScrollView = false;

const chapterImages = {
  english: { 1: 23, 2: 26, 3: 18 },
  telugu: { 1: 23, 2: 26, 3: 18 }
};

function openChapter(chapterNumber, selectedLanguage) {
  currentChapter = chapterNumber;
  language = selectedLanguage;
  currentImageIndex = 1;

  document.getElementById("header").style.display = "none";
  document.getElementById("chapter-list").classList.add("hidden");
  document.getElementById("comic-viewer").classList.remove("hidden");

  if (isScrollView) {
    document.getElementById("single-page-view").classList.add("hidden");
    document.getElementById("scroll-view").classList.remove("hidden");
    document.getElementById("toggleViewMode").textContent = "Switch to Single Page View";
    loadScrollView();
  } else {
    document.getElementById("scroll-view").classList.add("hidden");
    document.getElementById("single-page-view").classList.remove("hidden");
    document.getElementById("toggleViewMode").textContent = "Switch to Scroll View";
    loadImage();
  }
}


function backToHome() {
  document.getElementById("comic-viewer").classList.add("hidden");
  document.getElementById("header").style.display = "block";
  document.getElementById("chapter-list").classList.remove("hidden");
  currentImageIndex = 1;
  document.getElementById("comic-image").src = "";
  document.getElementById("page-counter").textContent = "";
}

function loadImage() {
  const imagePath = `images/${language}_chapter${currentChapter}/image${currentImageIndex}.png`;
  document.getElementById("comic-image").src = imagePath;

  document.getElementById("page-counter").textContent =
    `${currentImageIndex}/${chapterImages[language][currentChapter]} pages`;

  updateButtonStates();
  scrollToTop();
}

function scrollToTop() {
  document.getElementById("comic-viewer").scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function nextImage() {
  if (currentImageIndex < chapterImages[language][currentChapter]) {
    currentImageIndex++;
    loadImage();
  }
}

function prevImage() {
  if (currentImageIndex > 1) {
    currentImageIndex--;
    loadImage();
  }
}

function nextChapter() {
  if (chapterImages[language][currentChapter + 1]) {
    openChapter(currentChapter + 1, language);
  } else {
    alert("No more chapters available.");
  }
}

function updateButtonStates() {
  const prevButton = document.querySelector('.nav-button:nth-of-type(1)');
  const nextButton = document.querySelector('.nav-button:nth-of-type(2)');

  prevButton.disabled = currentImageIndex === 1;
  nextButton.disabled = currentImageIndex >= chapterImages[language][currentChapter];
}

function toggleViewMode() {
  isScrollView = !isScrollView;
  const singlePage = document.getElementById("single-page-view");
  const scrollView = document.getElementById("scroll-view");
  const toggleBtn = document.getElementById("toggleViewMode");

  if (isScrollView) {
    singlePage.classList.add("hidden");
    scrollView.classList.remove("hidden");
    toggleBtn.textContent = "Switch to Single Page View";
    loadScrollView();
  } else {
    singlePage.classList.remove("hidden");
    scrollView.classList.add("hidden");
    toggleBtn.textContent = "Switch to Scroll View";
    loadImage();
  }
}

function loadScrollView() {
  const container = document.getElementById("scroll-view");
  container.innerHTML = "";

  const totalPages = chapterImages[language][currentChapter];
  for (let i = 1; i <= totalPages; i++) {
    const img = document.createElement("img");
    img.src = `images/${language}_chapter${currentChapter}/image${i}.png`;
    img.alt = `Page ${i}`;
    img.onerror = function () {
      this.onerror = null;
      this.src = 'images/icon.png';
    };
    container.appendChild(img);
  }

  scrollToTop();
}
