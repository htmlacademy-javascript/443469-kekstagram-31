import {openUserModal, closeUserModal} from './popup.js';

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
