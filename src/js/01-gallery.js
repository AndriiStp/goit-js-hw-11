import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const list = document.querySelector('.gallery');

(function () {
  const markup = galleryItems
    .map(
      ({ preview, description, original }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>
    </li>`
    )
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
})();

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});