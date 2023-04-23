import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const $days = document.querySelector('[data-days]');
const $hours = document.querySelector('[data-hours]');
const $minutes = document.querySelector('[data-minutes]');
const $seconds = document.querySelector('[data-seconds]');

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
let timerId = null;
startBtn.setAttribute('disabled', 'disabled');
startBtn.addEventListener('click', onStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      startBtn.removeAttribute('disabled', 'disabled');
      Notiflix.Notify.success('Start button unlocked');
    } else if (options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);

function onStart() {
  timerId = setInterval(() => {
    const currentDate = new Date(input.value);
    const time = currentDate - Date.now();
    const convertTime = convertMs(time);
    updateClockFace(convertTime);
    if (time <= 1000) {
      clearInterval(timerId);
    }
  }, 1000);

  startBtn.setAttribute('disabled', 'disabled');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  $days.textContent = addLeadingZero(days);
  $hours.textContent = addLeadingZero(hours);
  $minutes.textContent = addLeadingZero(minutes);
  $seconds.textContent = addLeadingZero(seconds);
}
