// Clean, unified Navbar & Dropdown JS for Bootstrap-like native navbar

document.addEventListener('DOMContentLoaded', function() {
  // Navbar toggler
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarCollapse.classList.toggle('show');
      document.body.classList.toggle('no-scroll');
      // Set ARIA
      this.setAttribute('aria-expanded', navbarCollapse.classList.contains('show'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
        navbarToggler.classList.remove('active');
        navbarCollapse.classList.remove('show');
        document.body.classList.remove('no-scroll');
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdowns (desktop: hover/focus, mobile: click)
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (toggle && menu) {
      // Desktop: open on hover/focus, Mobile: open on click
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          // Toggle only this dropdown
          menu.style.display = (menu.style.display === 'block') ? '' : 'block';
          // Close others
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.style.display = '';
          });
        } else {
          e.preventDefault();
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('show');
          });
          menu.classList.toggle('show');
        }
      });

      // Optional: close dropdown on outside click (mobile)
      document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && !e.target.closest('.dropdown')) {
          menu.style.display = '';
        }
      });

      // Close dropdowns when clicking outside (desktop)
      document.addEventListener('click', function(e) {
        if (window.innerWidth > 992 && !e.target.closest('.dropdown')) {
          document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
          });
        }
      });
    }
  });

  // Handle dropdown menus on mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const dropdown = this.closest('.dropdown');
        dropdown.classList.toggle('active');
      }
    });
  });

// Testimonial slider functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-card');
const sliderContainer = document.querySelector('.testimonial-container');

function updateSlider() {
  const slideWidth = slides[0].offsetWidth + 16;
  const maxSlide = slides.length - getVisibleSlides();
  
  if (currentSlide < 0) currentSlide = 0;
  if (currentSlide > maxSlide) currentSlide = maxSlide;
  
  sliderContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function getVisibleSlides() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function scrollTestimonials(direction) {
  currentSlide += direction;
  updateSlider();
}

window.addEventListener('resize', updateSlider);
updateSlider();

});
