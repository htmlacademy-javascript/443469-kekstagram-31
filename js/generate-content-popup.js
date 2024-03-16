// import {openUserModal, closeUserModal} from './popup.js';
import {isEscapeKey} from './util.js';

const popupEl = document.querySelector('.big-picture');
const commentCountEl = document.querySelector('.social__comment-count');
const commentLoaderEl = document.querySelector('.comments-loader');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal() {
  popupEl.classList.remove('hidden');
  commentCountEl.classList.add('hidden');
  commentLoaderEl.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUserModal() {
  popupEl.classList.add('hidden');
  commentCountEl.classList.remove('hidden');
  commentLoaderEl.classList.remove('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const imagesEl = document.querySelector('.pictures');
const closeBtnEl = document.querySelector('.big-picture__cancel');

const bigImageEl = document.querySelector('.big-picture');

imagesEl.addEventListener('click', (evt) => {
  const clickedImage = evt.target.closest('.picture');

  if (clickedImage) {
    const image = clickedImage.querySelector('.picture__img');

    const imageUrl = image.src;
    const captionImage = image.alt;
    const likesCount = clickedImage.querySelector('.picture__likes').textContent;
    const commentsCountTotal = clickedImage.querySelector('.picture__comments').textContent;

    let commentsCountShown;
    if (commentsCountTotal < 5) {
      commentsCountShown = commentsCountTotal;
    } else {
      commentsCountShown = 5;
    }

    bigImageEl.querySelector('.big-picture__img').querySelector('img').src = imageUrl;
    bigImageEl.querySelector('.social__caption').textContent = captionImage;
    bigImageEl.querySelector('.likes-count').textContent = likesCount;
    bigImageEl.querySelector('.social__comment-total-count').textContent = commentsCountTotal;
    bigImageEl.querySelector('.social__comment-shown-count').textContent = commentsCountShown;

    openUserModal();
  }
});

closeBtnEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUserModal();
});
