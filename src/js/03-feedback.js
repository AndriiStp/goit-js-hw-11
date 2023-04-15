import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const feedbackKey = 'feedback-form-state';

let formData = JSON.parse(localStorage.getItem(feedbackKey));

const { email, message } = form.elements;

const saveLocal = throttle(event => {
  formData = { email: email.value, message: message.value };

  localStorage.setItem(feedbackKey, JSON.stringify(formData));
}, 500);

if (formData) {
  email.value = formData.email;
  message.value = formData.message;
}

function onSubmit(event) {
  event.preventDefault();
  localStorage.clear;

  if (email.value === '' || message.value === '') {
    return alert('Please fill all required fields');
  }

  console.log(formData);
  localStorage.removeItem(feedbackKey);
  event.currentTarget.reset();
}

form.addEventListener('input', saveLocal);
form.addEventListener('submit', onSubmit);
