const artworks = [...document.querySelectorAll('.artwork')];
const lightbox = document.querySelector('.art-lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxGroup = lightbox.querySelector('.lightbox-group');
let activeArtwork = 0;

function showArtwork(index) {
  activeArtwork = (index + artworks.length) % artworks.length;
  const artwork = artworks[activeArtwork];
  const image = artwork.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxGroup.textContent = artwork.dataset.group;
}

function openArtwork(index) {
  showArtwork(index);
  if (typeof lightbox.showModal === 'function') {
    if (!lightbox.open) lightbox.showModal();
  } else {
    lightbox.setAttribute('open', '');
  }
  document.documentElement.classList.add('preview-open');
}

document.addEventListener('click', event => {
  const openButton = event.target.closest('.art-open');
  if (!openButton) return;
  event.preventDefault();
  const artwork = openButton.closest('.artwork');
  const index = artworks.indexOf(artwork);
  if (index !== -1) openArtwork(index);
});

artworks.forEach(artwork => {
  artwork.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      artwork.querySelector('.art-open').click();
    }
  });
});

function closeArtwork() {
  if (typeof lightbox.close === 'function' && lightbox.open) lightbox.close();
  else lightbox.removeAttribute('open');
  document.documentElement.classList.remove('preview-open');
}

lightbox.querySelector('.lightbox-close').addEventListener('click', closeArtwork);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showArtwork(activeArtwork - 1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showArtwork(activeArtwork + 1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeArtwork(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showArtwork(activeArtwork - 1);
  if (event.key === 'ArrowRight') showArtwork(activeArtwork + 1);
});

document.getElementById('artistYear').textContent = new Date().getFullYear();

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  document.querySelectorAll('.section-intro, .artwork').forEach(element => revealObserver.observe(element));
}

const heroSlides = [...document.querySelectorAll('.hero-slide')];
const heroProgress = [...document.querySelectorAll('.hero-progress span')];
let activeHeroSlide = 0;

function advanceHero() {
  heroSlides[activeHeroSlide].classList.remove('active');
  heroProgress[activeHeroSlide].classList.remove('active');
  activeHeroSlide = (activeHeroSlide + 1) % heroSlides.length;
  heroSlides[activeHeroSlide].classList.add('active');
  heroProgress[activeHeroSlide].classList.add('active');
}

if (heroSlides.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroProgress[0].classList.add('active');
  window.setInterval(advanceHero, 4200);
}

document.querySelectorAll('.portrait-wall, .cinema-grid, .other-grid').forEach(rail => {
  const controls = document.createElement('div');
  controls.className = 'rail-controls';
  controls.innerHTML = '<span>Drag to explore</span><button type="button" aria-label="Previous artworks">←</button><button type="button" aria-label="Next artworks">→</button>';
  rail.before(controls);

  const scrollAmount = () => Math.min(rail.clientWidth * .78, 720);
  controls.querySelector('button:first-of-type').addEventListener('click', () => rail.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
  controls.querySelector('button:last-of-type').addEventListener('click', () => rail.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

});
