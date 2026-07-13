class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="nav" id="nav">
        <div class="nav-inner">
          <a href="index.html" class="brand">
            <img src="SG - photos/logo.jpg" alt="Sri Garudadri Logo" class="brand-logo">
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
          <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
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
        const isActive = navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', isActive);
        navLinks.classList.toggle('active');
      });

      // Close menu when a link is tapped
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navToggle.classList.remove('active');
          navToggle.setAttribute('aria-expanded', 'false');
          navLinks.classList.remove('active');
        });
      });
    }
  }
}

customElements.define('sgeps-header', Header);
