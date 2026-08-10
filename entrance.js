const gate = document.querySelector('.world-gate');

document.querySelectorAll('.world').forEach(world => {
  world.addEventListener('pointermove', event => {
    const rect = world.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - .5) * 10;
    world.style.setProperty('--mx', `${x}px`);
    world.style.setProperty('--my', `${y}px`);
  });
});

gate.classList.add('ready');
