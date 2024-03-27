import {onEscKeyDown} from './util.js';

const popupEl = document.querySelector('.big-picture');
const commentCountEl = document.querySelector('.social__comment-count');
const commentLoaderEl = document.querySelector('.comments-loader');

const bigImageEl = document.querySelector('.big-picture');
const closeBtnEl = document.querySelector('.big-picture__cancel');
const commentsEl = bigImageEl.querySelector('.social__comments');
const commentEl = bigImageEl.querySelector('.social__comment');

const fillComments = (photoComments) => {
  commentsEl.innerHTML = '';

  photoComments.forEach(({avatar, name, message}) => {
    const newComment = commentEl.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    commentsEl.append(newComment);
  });
};

const fillPopup = ({url, description, likes, comments}) => {
  const imgEl = bigImageEl.querySelector('.big-picture__img img');
  imgEl.src = url;
  imgEl.alt = description;
  bigImageEl.querySelector('.social__caption').textContent = description;
  bigImageEl.querySelector('.likes-count').textContent = likes;
  bigImageEl.querySelector('.social__comment-total-count').textContent = comments.length;

  fillComments(comments);
};

closeBtnEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

const onPopupEscKeydown = (evt) => onEscKeyDown(evt, closePopup);

const openPopup = (photo) => {
  fillPopup(photo);

  popupEl.classList.remove('hidden');
  commentCountEl.classList.add('hidden');
  commentLoaderEl.classList.add('hidden');

  document.addEventListener('keydown', onPopupEscKeydown);
};

//function declaration to call it anywhere
function closePopup() {
  popupEl.classList.add('hidden');
  commentCountEl.classList.remove('hidden');
  commentLoaderEl.classList.remove('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {openPopup};
