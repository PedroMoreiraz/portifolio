const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

function getCardWidth() {
  const card = document.querySelector(".card-flip");
  const style = window.getComputedStyle(card);
  const width = card.offsetWidth;
  const gap = 16;
  return width + gap;
}

function updateCarousel() {
  const cardWidth = getCardWidth();
  const offset = currentIndex * cardWidth;
  track.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener("click", () => {
  const totalCards = track.children.length;
  const maxIndex = totalCards - visibleCards();
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

function visibleCards() {
  const viewportWidth = document.querySelector(".carousel-viewport").offsetWidth;
  const cardWidth = getCardWidth();
  return Math.floor(viewportWidth / cardWidth);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("flip-btn")) {
    const card = e.target.closest(".card-flip");
    card.classList.toggle("flipped");
  }
});

window.addEventListener("resize", updateCarousel);
window.addEventListener("load", updateCarousel);
