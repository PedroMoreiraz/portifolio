const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;
const cardWidth = 270; // 250px + 20px gap
const visibleCards = 3;

function updateCarousel() {
  const offset = currentIndex * cardWidth;
  track.style.transform = `translateX(-${offset}px)`;
}

nextBtn.addEventListener("click", () => {
  const totalCards = track.children.length;
  const maxIndex = totalCards - visibleCards;
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

document.querySelectorAll('.flip-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    card.classList.toggle('flipped');
  });
});
