import {debounce} from './util.js';
import {openPopup} from './popup.js';

const MAX_PHOTO_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const photoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const photoResultContainerEl = document.querySelector('.pictures');

const filtersEl = document.querySelector('.img-filters__form');

const createPhotoThumb = ({url, description, likes, comments}) => {
  const imageThumbnail = photoTemplateEl.cloneNode(true);
  const imageEl = imageThumbnail.querySelector('.picture__img');

  imageEl.src = url;
  imageEl.alt = description;
  imageThumbnail.querySelector('.picture__likes').textContent = likes;
  imageThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return imageThumbnail;
};

const createThumbnails = (thumbnails) => {
  thumbnails.forEach((photo) => {
    const imageThumbnail = createPhotoThumb(photo);
    imageThumbnail.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPopup(photo);
    });
    photoFragment.appendChild(imageThumbnail);
  });

  photoResultContainerEl.appendChild(photoFragment);
};

let photos = [];

const clearPhotos = () => {
  document.querySelectorAll('a.picture').forEach((photo) => photo.remove());
};

const showDefaultPhotos = () => {
  clearPhotos();
  createThumbnails(photos);
};

const showRandomPhotos = () => {
  clearPhotos();
  createThumbnails(photos.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_PHOTO_COUNT));
};

const showDiscussedPhotos = () => {
  clearPhotos();
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const onChangeFilter = (evt) => {
  const target = evt.target.closest('button');
  const activeButtonEl = document.querySelector(`.${ACTIVE_CLASS}`);

  if (target === activeButtonEl) {
    return;
  }
  if (!target.classList.contains(ACTIVE_CLASS)) {
    activeButtonEl.classList.toggle(ACTIVE_CLASS);
    target.classList.toggle(ACTIVE_CLASS);
  }
};

const initThumbnails = (photosServer) => {
  photos = photosServer;
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  filtersEl.addEventListener('click', onChangeFilter);

  document.querySelector('#filter-default').addEventListener('click', debounce(showDefaultPhotos));
  document.querySelector('#filter-random').addEventListener('click', debounce(showRandomPhotos));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(showDiscussedPhotos));

  showDefaultPhotos();
};

export {initThumbnails};
