let currentIndex = 0;
const cardWidth = 320 + 16; // card width + gap
const visibleCards = 3;
const totalCards = document.querySelectorAll('.testimonial-card').length;

function slide(direction) {
  const maxIndex = totalCards - visibleCards;
  currentIndex += direction;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  const track = document.getElementById('testimonialTrack');
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}
