/*gese-geser */
function scrollTestimonials(direction) {
  const container = document.getElementById("testimonialContainer");
  const cardWidth = 320; // width + margin
  container.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth"
  });
}

/*PANAH NAIK TURUN */
 
  document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.getElementById("scrollToggle");
    const scrollIcon = document.getElementById("scrollIcon");
    const footer = document.getElementById("footer");

    function handleScrollToggle() {
      const footerTop = footer.getBoundingClientRect().top + window.scrollY;
      const isAtBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

      if (!isAtBottom) {
        // Scroll langsung ke footer
        window.scrollTo({
          top: footerTop,
          behavior: "smooth"
        });
      } else {
        // Scroll ke atas
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }

    scrollBtn.addEventListener("click", handleScrollToggle);

    window.addEventListener("scroll", () => {
      const isAtBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

      if (isAtBottom) {
        scrollIcon.src = "gambar/scrollTop.png"; // Panah ke atas
      } else {
        scrollIcon.src = "gambar/scrollDown.png"; // Panah ke bawah
      }
    });
  });
