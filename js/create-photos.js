import {getPublishedPhotos} from './mocks/content.js';

const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const photoResultContainer = document.querySelector('.pictures');

const createPhotoThumb = ({url, description, likes, comments}) => {
  const imageThumbnail = photoTemplate.cloneNode(true);
  const image = imageThumbnail.querySelector('.picture__img');

  image.src = url;
  image.alt = description;
  imageThumbnail.querySelector('.picture__likes').textContent = likes;
  imageThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return imageThumbnail;
};

getPublishedPhotos.forEach((photo) => {
  const imageThumbnail = createPhotoThumb(photo);
  photoFragment.appendChild(imageThumbnail);
});

photoResultContainer.appendChild(photoFragment);
