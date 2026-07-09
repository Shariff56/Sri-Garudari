class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="contact">
        <div class="container">
          <div class="foot-grid">
            <div class="foot-brand">
              <div class="brand-text">Sri Garudadri<span>English Public School</span></div>
              <p>Ward No. 1, Kanaka Nagara, Shidlaghatta, Karnataka – 562105. Run by Vidyasiri Education Trust (R).</p>
            </div>
            <div>
              <h5>Explore</h5>
              <ul>
                <li><a href="about.html">About Us</a></li>
                <li><a href="principal-message.html">Principal's Message</a></li>
                <li><a href="academics.html">Academics</a></li>
                <li><a href="facilities.html">Facilities</a></li>
                <li><a href="gallery.html">Gallery</a></li>
              </ul>
            </div>
            <div>
              <h5>Resources</h5>
              <ul>
                <li><a href="achievements.html">Achievements</a></li>
                <li><a href="news-events.html">News &amp; Events</a></li>
                <li><a href="faculty.html">Faculty</a></li>
                <li><a href="testimonials.html">Testimonials</a></li>
                <li><a href="downloads.html">Downloads</a></li>
                <li><a href="notifications.html">Notice Board</a></li>
              </ul>
            </div>
            <div>
              <h5>Contact</h5>
              <ul>
                <li>+91 63627 77569</li>
                <li>newgarudadri2018@gmail.com</li>
                <li>Shidlaghatta – 562105</li>
              </ul>
            </div>
          </div>
          <div class="foot-bottom">
            <span>© ${new Date().getFullYear()} Sri Garudadri English Public School. All rights reserved.</span>
            <span>Site by OPTI-X</span>
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('sgeps-footer', Footer);
