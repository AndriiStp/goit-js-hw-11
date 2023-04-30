import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

const onInput = debounce(evt => {
  const name = evt.target.value.trim();
  if (!name) {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  fetchCountries(name)
    .then(findCountry)
    .catch(error => console.log(error));
}, DEBOUNCE_DELAY);

function findCountry(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    return;
  }
  if (countries.length === 1) {
    countryList.innerHTML = '';
    return renderCountry(countries);
  }
  if (countries.length > 1) {
    countryInfo.innerHTML = '';
    return renderCountries(countries);
  }
}

function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div>
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${
        country.name.official
      }">
      <h2>${country.name.official}</h2></div>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)}</p>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" width="50" height="30" alt="flag of ${country.name.official}">
      <p>${country.name.official}</p></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

input.addEventListener('input', onInput);
