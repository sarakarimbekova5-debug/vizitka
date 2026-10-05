document.addEventListener('DOMContentLoaded', () => {
  const cardContainer = document.getElementById('cardContainer');
  const flipBtn = document.getElementById('flip-btn');
  const stage = document.querySelector('.stage');

  let isFlipped = false;

  const toggleFlip = () => {
    isFlipped = !isFlipped;
    cardContainer.classList.toggle('flipped', isFlipped);
    
    flipBtn.innerHTML = isFlipped 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/><path d="M21 21v-5h-5"/></svg> Алдыңкы бетин көрүү`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12A9 9 0 0 0 6 5.3L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"/><path d="M21 21v-5h-5"/></svg> Арткы бетин көрүү`;
  };

  flipBtn.addEventListener('click', toggleFlip);
  
  cardContainer.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) return;
    toggleFlip();
  });

  // 3D Tilt Effect
  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    const currentFlip = isFlipped ? 180 : 0;

    cardContainer.style.transform = `rotateX(${rotateX}deg) rotateY(${currentFlip + rotateY}deg)`;
  });

  stage.addEventListener('mouseleave', () => {
    const currentFlip = isFlipped ? 180 : 0;
    cardContainer.style.transform = `rotateX(0deg) rotateY(${currentFlip}deg)`;
    cardContainer.style.transition = 'transform 0.6s ease';
  });

  stage.addEventListener('mouseenter', () => {
    cardContainer.style.transition = 'none';
  });
});