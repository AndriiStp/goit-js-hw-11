const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

start.addEventListener('click', onStart);
stop.addEventListener('click', onStop);
let timerId = null;

function onStart() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  if (timerId) {
    start.setAttribute('disabled', 'disabled');
  }
}

function onStop() {
  clearInterval(timerId);
  start.removeAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
