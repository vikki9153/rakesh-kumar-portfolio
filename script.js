const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const contactDialog = document.getElementById('contact-dialog');
const copyStatus = document.getElementById('copy-status');
const photoDialog = document.getElementById('photo-dialog');
const photoDialogImage = document.getElementById('photo-dialog-image');
const photoDialogCaption = document.getElementById('photo-dialog-caption');

const galleryPhotos = [
  { image: 'gallery-images/photo-01.jpg', title: 'Garden portrait', category: 'outdoor', alt: 'Seated portrait in a garden, wearing a maroon shirt' },
  { image: 'gallery-images/photo-02.jpg', title: 'By the palms', category: 'outdoor', alt: 'Full-length outdoor portrait beside palm plants' },
  { image: 'gallery-images/photo-03.jpg', title: 'Studio session', category: 'studio', alt: 'Seated portrait against a warm studio backdrop' },
  { image: 'gallery-images/photo-04.jpg', title: 'Quiet thought', category: 'studio', alt: 'Studio portrait in a thoughtful pose' },
  { image: 'gallery-images/photo-05.jpg', title: 'Red set', category: 'studio', alt: 'Full-length fashion portrait on a red studio set' },
  { image: 'gallery-images/photo-06.jpg', title: 'Movement in colour', category: 'studio', alt: 'Fashion portrait in a maroon shirt against red' },
  { image: 'gallery-images/photo-07.jpg', title: 'On the mark', category: 'studio', alt: 'Relaxed full-length portrait on a red backdrop' },
  { image: 'gallery-images/photo-08.jpg', title: 'Red light portrait', category: 'portrait', alt: 'Close portrait with dramatic red lighting' },
  { image: 'gallery-images/photo-09.jpg', title: 'After dark', category: 'street', alt: 'Night portrait seated beneath city lights' },
  { image: 'gallery-images/photo-10.jpg', title: 'Tailored in red', category: 'studio', alt: 'Formal portrait in a black suit against a deep red background' },
  { image: 'gallery-images/photo-11.jpg', title: 'City at night', category: 'street', alt: 'Candid portrait on a city street at night' },
  { image: 'gallery-images/photo-12.jpg', title: 'Pink in the old city', category: 'outdoor', alt: 'Portrait in a pink shirt among historic architecture' },
  { image: 'gallery-images/photo-13.jpg', title: 'Between reflections', category: 'portrait', alt: 'Low-key portrait beside a mirror' },
  { image: 'gallery-images/photo-14.jpg', title: 'Side-street study', category: 'street', alt: 'Street portrait in blue tones' },
  { image: 'gallery-images/photo-15.webp', title: 'Tea break', category: 'portrait', alt: 'Relaxed portrait holding a patterned tea cup' },
  { image: 'gallery-images/photo-16.jpg', title: 'Lights after hours', category: 'street', alt: 'Night portrait with warm lights in the background' },
  { image: 'gallery-images/photo-17.jpg', title: 'Night lookbook', category: 'editorial', alt: 'Night portrait presented as an editorial layout' },
  { image: 'gallery-images/photo-18.jpg', title: 'Doorway portrait', category: 'outdoor', alt: 'Casual portrait in a dark outfit by a doorway' },
  { image: 'gallery-images/photo-19.jpg', title: 'Among the flowers', category: 'outdoor', alt: 'Portrait in a white shirt beside flowering plants' },
  { image: 'gallery-images/photo-20.jpg', title: 'Outside the café', category: 'street', alt: 'Maroon shirt portrait outside a café' },
  { image: 'gallery-images/photo-21.jpg', title: 'In soft daylight', category: 'portrait', alt: 'Blue shirt portrait in a bright corridor' },
  { image: 'gallery-images/photo-22.jpg', title: 'Cool tones', category: 'portrait', alt: 'Portrait in a pale blue shirt' },
  { image: 'gallery-images/photo-23.jpg', title: 'In the doorway', category: 'outdoor', alt: 'Portrait against a warm wooden doorway' },
  { image: 'gallery-images/photo-24.jpg', title: 'Afternoon light', category: 'outdoor', alt: 'Portrait framed by the warm light of a wooden doorway' },
  { image: 'gallery-images/photo-25.jpg', title: 'Garden walk', category: 'outdoor', alt: 'Portrait in light clothing by a garden fence' },
  { image: 'gallery-images/photo-26.jpg', title: 'A second garden frame', category: 'outdoor', alt: 'Outdoor portrait in light clothing' },
  { image: 'gallery-images/photo-27.jpg', title: 'A moment in the grass', category: 'outdoor', alt: 'Seated outdoor portrait among green plants' },
  { image: 'gallery-images/photo-28.jpg', title: 'Along the wall', category: 'portrait', alt: 'Full-length portrait in a pale blue shirt' },
  { image: 'gallery-images/photo-29.jpg', title: 'Late-night tones', category: 'studio', alt: 'Fashion portrait in a dark elevator' },
];

const galleryTrack = document.getElementById('gallery-track');
const galleryCount = document.getElementById('gallery-count');
const galleryPosition = document.getElementById('gallery-position');
const galleryProgress = document.querySelector('.gallery-progress');
const galleryProgressFill = document.getElementById('gallery-progress-fill');
const autoplayToggle = document.querySelector('[data-autoplay-toggle]');
const gallerySlides = [];

if (galleryTrack) {
  galleryPhotos.forEach((photo) => {
    const slide = document.createElement('article');
    slide.className = 'gallery-slide';
    slide.dataset.category = photo.category;

    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'gallery-card';
    card.dataset.imageOpen = '';
    card.dataset.image = photo.image;
    card.dataset.imageAlt = photo.alt;
    card.dataset.imageCaption = photo.title;
    card.setAttribute('aria-label', `View larger photo: ${photo.title}`);

    const image = document.createElement('img');
    image.src = photo.image;
    image.alt = photo.alt;
    image.loading = 'lazy';
    image.decoding = 'async';

    const caption = document.createElement('span');
    caption.className = 'gallery-card-caption';
    const title = document.createElement('span');
    title.textContent = photo.title;
    const meta = document.createElement('span');
    meta.innerHTML = `${photo.category} <b aria-hidden="true">↗</b>`;
    caption.append(title, meta);
    card.append(image, caption);
    slide.append(card);
    galleryTrack.append(slide);
    gallerySlides.push(slide);
  });
}

function getVisibleSlides() {
  return gallerySlides.filter((slide) => !slide.hidden);
}

function updateCarouselStatus() {
  if (!galleryTrack) return;
  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) return;
  const width = galleryTrack.clientWidth || 1;
  const index = Math.max(0, Math.min(visibleSlides.length - 1, Math.round(galleryTrack.scrollLeft / width)));
  const current = index + 1;
  if (galleryPosition) galleryPosition.textContent = `${String(current).padStart(2, '0')} / ${String(visibleSlides.length).padStart(2, '0')}`;
  if (galleryProgressFill) galleryProgressFill.style.width = `${(current / visibleSlides.length) * 100}%`;
  if (galleryProgress) {
    galleryProgress.setAttribute('aria-valuemax', String(visibleSlides.length));
    galleryProgress.setAttribute('aria-valuenow', String(current));
  }
}

function goToSlide(index, behavior = 'smooth') {
  if (!galleryTrack) return;
  const visibleSlides = getVisibleSlides();
  if (!visibleSlides.length) return;
  const nextIndex = ((index % visibleSlides.length) + visibleSlides.length) % visibleSlides.length;
  galleryTrack.scrollTo({ left: nextIndex * galleryTrack.clientWidth, behavior });
  requestAnimationFrame(updateCarouselStatus);
}

function currentSlideIndex() {
  return Math.round((galleryTrack?.scrollLeft || 0) / (galleryTrack?.clientWidth || 1));
}

document.querySelectorAll('[data-gallery-filter]').forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    const selected = filterButton.dataset.galleryFilter;
    let visible = 0;
    gallerySlides.forEach((slide) => {
      const show = selected === 'all' || slide.dataset.category === selected;
      slide.hidden = !show;
      if (show) visible += 1;
    });
    document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
      const active = button === filterButton;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (galleryCount) galleryCount.textContent = `${visible} PHOTOGRAPHS`;
    galleryTrack?.scrollTo({ left: 0, behavior: 'auto' });
    requestAnimationFrame(updateCarouselStatus);
  });
});

galleryTrack?.addEventListener('scroll', () => requestAnimationFrame(updateCarouselStatus), { passive: true });
window.addEventListener('resize', updateCarouselStatus);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const visualReelPhotos = [2, 8, 14, 16, 20, 22, 28].map((index) => galleryPhotos[index]);
const reelPlayer = document.getElementById('reel-player');
const reelImage = document.getElementById('reel-image');
const reelTitle = document.getElementById('reel-title');
const reelCategory = document.getElementById('reel-category');
const reelPosition = document.getElementById('reel-position');
const reelProgress = document.querySelector('.reel-progress');
const reelProgressFill = document.getElementById('reel-progress-fill');
const reelToggle = document.querySelector('[data-reel-toggle]');
let reelIndex = 0;
let reelAutoplayEnabled = !reducedMotion.matches;
let reelPausedByPointer = false;
let reelPausedByFocus = false;

function renderReelFrame() {
  const photo = visualReelPhotos[reelIndex];
  if (!photo) return;
  if (reelImage) {
    reelImage.src = photo.image;
    reelImage.alt = photo.alt;
    reelImage.classList.remove('is-changing');
    requestAnimationFrame(() => reelImage.classList.add('is-changing'));
  }
  if (reelTitle) reelTitle.textContent = photo.title;
  if (reelCategory) reelCategory.textContent = photo.category.toUpperCase();
  if (reelPosition) reelPosition.textContent = `${String(reelIndex + 1).padStart(2, '0')} / ${String(visualReelPhotos.length).padStart(2, '0')}`;
  if (reelProgress) reelProgress.setAttribute('aria-valuenow', String(reelIndex + 1));
  if (reelProgressFill) reelProgressFill.style.width = `${((reelIndex + 1) / visualReelPhotos.length) * 100}%`;
}

function updateReelToggle() {
  if (!reelToggle) return;
  reelToggle.setAttribute('aria-pressed', String(reelAutoplayEnabled));
  reelToggle.innerHTML = reelAutoplayEnabled
    ? '<span aria-hidden="true">Ⅱ</span> Pause reel'
    : '<span aria-hidden="true">▶</span> Play reel';
}

function setReelFrame(index) {
  reelIndex = (index + visualReelPhotos.length) % visualReelPhotos.length;
  renderReelFrame();
}

renderReelFrame();
updateReelToggle();

reelToggle?.addEventListener('click', () => {
  reelAutoplayEnabled = !reelAutoplayEnabled;
  updateReelToggle();
});
document.querySelector('[data-reel-prev]')?.addEventListener('click', () => {
  setReelFrame(reelIndex - 1);
  reelAutoplayEnabled = false;
  updateReelToggle();
});
document.querySelector('[data-reel-next]')?.addEventListener('click', () => {
  setReelFrame(reelIndex + 1);
  reelAutoplayEnabled = false;
  updateReelToggle();
});
reelPlayer?.addEventListener('mouseenter', () => { reelPausedByPointer = true; });
reelPlayer?.addEventListener('mouseleave', () => { reelPausedByPointer = false; });
reelPlayer?.addEventListener('focusin', () => { reelPausedByFocus = true; });
reelPlayer?.addEventListener('focusout', (event) => {
  if (!reelPlayer.contains(event.relatedTarget)) reelPausedByFocus = false;
});
window.setInterval(() => {
  if (reelAutoplayEnabled && !reelPausedByPointer && !reelPausedByFocus && !document.hidden) {
    setReelFrame(reelIndex + 1);
  }
}, 5200);

const reviewForm = document.getElementById('review-form');
const reviewStatus = document.getElementById('review-status');
reviewForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(reviewForm);
  const name = String(formData.get('name') || '').trim();
  const project = String(formData.get('project') || '').trim();
  const feedback = String(formData.get('feedback') || '').trim();
  const hasPermission = formData.get('permission') === 'on';
  const permissionNote = hasPermission
    ? 'You may feature this feedback on your portfolio with my name.'
    : 'Please ask me before sharing this feedback publicly.';
  const message = `Hi Rakesh, I’m ${name}.\n\nI worked with you on: ${project}.\n\nMy feedback: “${feedback}”\n\n${permissionNote}`;
  const whatsappUrl = `https://wa.me/919142548861?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  if (reviewStatus) reviewStatus.textContent = 'WhatsApp opened with your message. Review it and tap Send to share your feedback.';
});

let autoplayEnabled = !reducedMotion.matches;
let pointerIsDown = false;
let pointerStartX = 0;
let pointerStartScroll = 0;
let dragStarted = false;
let suppressClick = false;

function updateAutoplayButton() {
  if (!autoplayToggle) return;
  autoplayToggle.setAttribute('aria-pressed', String(autoplayEnabled));
  autoplayToggle.innerHTML = autoplayEnabled
    ? '<span aria-hidden="true">Ⅱ</span> Pause auto-scroll'
    : '<span aria-hidden="true">▶</span> Play auto-scroll';
}

function pauseAutoplay() {
  autoplayEnabled = false;
  updateAutoplayButton();
}

updateAutoplayButton();
autoplayToggle?.addEventListener('click', () => {
  autoplayEnabled = !autoplayEnabled;
  updateAutoplayButton();
});

document.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
  goToSlide(currentSlideIndex() - 1);
  pauseAutoplay();
});
document.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
  goToSlide(currentSlideIndex() + 1);
  pauseAutoplay();
});

const galleryStage = document.querySelector('.gallery-stage');
let pausedByPointer = false;
let pausedByFocus = false;
galleryStage?.addEventListener('mouseenter', () => { pausedByPointer = true; });
galleryStage?.addEventListener('mouseleave', () => { pausedByPointer = false; });
galleryStage?.addEventListener('focusin', () => { pausedByFocus = true; });
galleryStage?.addEventListener('focusout', (event) => {
  if (!galleryStage.contains(event.relatedTarget)) pausedByFocus = false;
});

const autoplayTimer = window.setInterval(() => {
  if (autoplayEnabled && !pausedByPointer && !pausedByFocus && !document.hidden) {
    goToSlide(currentSlideIndex() + 1);
  }
}, 4500);

galleryTrack?.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'mouse') {
    pauseAutoplay();
    return;
  }
  if (event.button !== 0) return;
  pointerIsDown = true;
  dragStarted = false;
  pointerStartX = event.clientX;
  pointerStartScroll = galleryTrack.scrollLeft;
  galleryTrack.classList.add('is-dragging');
});

window.addEventListener('pointermove', (event) => {
  if (!pointerIsDown || !galleryTrack) return;
  const distance = event.clientX - pointerStartX;
  if (Math.abs(distance) > 5) dragStarted = true;
  if (dragStarted) {
    pauseAutoplay();
    event.preventDefault();
    galleryTrack.scrollLeft = pointerStartScroll - distance;
  }
});

window.addEventListener('pointerup', () => {
  if (!pointerIsDown) return;
  pointerIsDown = false;
  galleryTrack?.classList.remove('is-dragging');
  if (dragStarted) {
    suppressClick = true;
    window.setTimeout(() => { suppressClick = false; }, 0);
  }
});

galleryTrack?.addEventListener('click', (event) => {
  if (!suppressClick) return;
  event.preventDefault();
  event.stopPropagation();
}, true);

galleryTrack?.addEventListener('keydown', (event) => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  pauseAutoplay();
  goToSlide(currentSlideIndex() + (event.key === 'ArrowRight' ? 1 : -1));
});

requestAnimationFrame(updateCarouselStatus);

document.querySelectorAll('[data-contact-open]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!contactDialog) return;
    copyStatus.textContent = '';
    if (typeof contactDialog.showModal === 'function') contactDialog.showModal();
    else window.location.hash = 'contact';
  });
});

document.querySelectorAll('[data-contact-close]').forEach((button) => {
  button.addEventListener('click', () => contactDialog?.close());
});

contactDialog?.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

document.querySelectorAll('[data-image-open]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!photoDialog || !photoDialogImage || !photoDialogCaption) return;
    pauseAutoplay();
    photoDialogImage.src = button.dataset.image;
    photoDialogImage.alt = button.dataset.imageAlt || '';
    photoDialogCaption.textContent = button.dataset.imageCaption || '';
    if (typeof photoDialog.showModal === 'function') photoDialog.showModal();
  });
});

document.querySelectorAll('[data-photo-close]').forEach((button) => {
  button.addEventListener('click', () => photoDialog?.close());
});

photoDialog?.addEventListener('click', (event) => {
  if (event.target === photoDialog) photoDialog.close();
});

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  if (!copied) throw new Error('Copy failed');
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.dataset.copy;
    try {
      await copyText(value);
      copyStatus.textContent = `${value} copied to clipboard.`;
    } catch {
      copyStatus.textContent = `Please select and copy: ${value}`;
    }
  });
});
