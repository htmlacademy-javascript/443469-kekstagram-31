import {debounce} from './util.js';
import {openPopup} from './popup.js';

const photoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const photoResultContainerEl = document.querySelector('.pictures');

const createPhotoThumb = ({url, description, likes, comments}) => {
  const imageThumbnail = photoTemplateEl.cloneNode(true);
  const imageEl = imageThumbnail.querySelector('.picture__img');

  imageEl.src = url;
  imageEl.alt = description;
  imageThumbnail.querySelector('.picture__likes').textContent = likes;
  imageThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return imageThumbnail;
};

let photos = [];


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

const showDefaultPhotos = () => {
  createThumbnails(photos);
};

const showRandomPhotos = () => {
  console.log('random');
};

const showDiscussedPhotos = () => {
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const initThumbnails = (photosServer) => {
  photos = photosServer;
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');


  document.querySelector('#filter-default').addEventListener('click', debounce(showDefaultPhotos));
  document.querySelector('#filter-random').addEventListener('click', debounce(showRandomPhotos));
  document.querySelector('#filter-discussed').addEventListener('click', debounce(showDiscussedPhotos));

  showDefaultPhotos();
};

export {initThumbnails};
