class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="nav" id="nav">
        <div class="nav-inner">
          <a href="index.html" class="brand">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="22.5" stroke="#C6A15B" stroke-width="1.5"/>
              <path d="M24 12L36 18L24 24L12 18L24 12Z" stroke="#C6A15B" stroke-width="1.4" stroke-linejoin="round"/>
              <path d="M18 21V28C18 28 20.5 31 24 31C27.5 31 30 28 30 28V21" stroke="#C6A15B" stroke-width="1.4"/>
              <path d="M33 19.5V26" stroke="#C6A15B" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            <div class="brand-text">Sri Garudadri
              <span>English Public School</span>
            </div>
          </a>
          <ul class="nav-links" id="navLinks">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="academics.html">Academics</a></li>
            <li><a href="facilities.html">Facilities</a></li>
            <li><a href="gallery.html">Gallery</a></li>
          </ul>
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
        </div>
      </nav>
    `;

    // Detect current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHomepage = (currentPath === '' || currentPath === 'index.html');
    const nav = this.querySelector('.nav');

    // Highlight active link
    const links = this.querySelectorAll('.nav-links a');
    links.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });

    // Inner pages: start scrolled (opaque) since there's no hero behind the nav
    if (!isHomepage) {
      nav.classList.add('scrolled');
    }

    // Scroll effect
    window.addEventListener('scroll', () => {
      if (isHomepage) {
        // Homepage: toggle glassmorphism based on scroll
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      }
      // Inner pages: always stay scrolled (opaque)
    });

    // Mobile menu toggle
    const navToggle = this.querySelector('#navToggle');
    const navLinks = this.querySelector('#navLinks');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
      });

      // Close menu when a link is tapped
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
  }
}

customElements.define('sgeps-header', Header);
