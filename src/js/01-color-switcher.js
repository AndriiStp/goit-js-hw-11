const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

start.addEventListener('click', () => {
  const changer = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (changer) {
    start.setAttribute('disabled', 'disabled');
  }
});

stop.addEventListener('click', () => {
  clearInterval(changer);
  start.removeAttribute('disabled', 'disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777214)
    .toString(16)
    .padStart(6, 0)}`;
}
