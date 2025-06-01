// Fungsi scroll testimonial
function scrollTestimonials(direction) {
  const container = document.getElementById("testimonialContainer");
  const cardWidth = 320; // width + margin
  container.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth"
  });
}

/* Semua kode dijalankan setelah halaman dimuat */
document.addEventListener("DOMContentLoaded", () => {
  /** ==========================
   *  PANAH NAIK TURUN
   * ========================== */
  const scrollBtn = document.getElementById("scrollToggle");
  const scrollIcon = document.getElementById("scrollIcon");
  const footer = document.getElementById("footer");

  function handleScrollToggle() {
    const footerTop = footer.getBoundingClientRect().top + window.scrollY;
    const isAtBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

    if (!isAtBottom) {
      window.scrollTo({
        top: footerTop,
        behavior: "smooth"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }

  scrollBtn.addEventListener("click", handleScrollToggle);

  window.addEventListener("scroll", () => {
    const isAtBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 10;

    scrollIcon.src = isAtBottom ? "gambar/scrollTop.png" : "gambar/scrollDown.png";

    const footerTop = footer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (footerTop < windowHeight) {
      const overlap = windowHeight - footerTop + 16;
      scrollBtn.style.bottom = `${overlap}px`;
    } else {
      scrollBtn.style.bottom = "16px";
    }
  });

  /** ==========================
   *  TOGGLE MENU NAVBAR MOBILE
   * ========================== */
  const burgerBtn = document.querySelector(".burger-button"); 
  const menu = document.querySelector(".navbar-menu");

  function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle("active");
  }

  if (burgerBtn) {
    burgerBtn.addEventListener("click", toggleMenu);
  }
});
