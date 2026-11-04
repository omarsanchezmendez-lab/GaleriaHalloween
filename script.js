const cards = [...document.querySelectorAll('.photo-card')];
const filters = [...document.querySelectorAll('.filter')];
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const caption = lightbox.querySelector('.lightbox-caption');
let visibleCards = cards;
let currentIndex = 0;

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const category = button.dataset.filter;
    cards.forEach(card => {
      card.hidden = category !== 'todos' && card.dataset.category !== category;
    });
    visibleCards = cards.filter(card => !card.hidden);
  });
});

function openImage(index) {
  currentIndex = index;
  const card = visibleCards[currentIndex];
  const image = card.querySelector('img');
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  caption.textContent = card.querySelector('strong').textContent;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeImage() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
function moveImage(direction) {
  currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
  openImage(currentIndex);
}
cards.forEach(card => card.addEventListener('click', () => {
  visibleCards = cards.filter(item => !item.hidden);
  openImage(visibleCards.indexOf(card));
}));
lightbox.querySelector('.close').addEventListener('click', closeImage);
lightbox.querySelector('.prev').addEventListener('click', () => moveImage(-1));
lightbox.querySelector('.next').addEventListener('click', () => moveImage(1));
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeImage(); });
document.addEventListener('keydown', event => {
  if (lightbox.hidden) return;
  if (event.key === 'Escape') closeImage();
  if (event.key === 'ArrowRight') moveImage(1);
  if (event.key === 'ArrowLeft') moveImage(-1);
});
