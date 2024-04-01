import {isEscapeKey, onEscKeyDown} from './util.js';

const MAX_COMMENTS_COUNT = 5;
let currentCount = 0;

const popupEl = document.querySelector('.big-picture');
const commentCountEl = document.querySelector('.social__comment-count');
const commentShownCountEl = document.querySelector('.social__comment-shown-count');
const commentTotalCountEl = document.querySelector('.social__comment-total-count');
const commentLoaderEl = document.querySelector('.comments-loader');
const commentInputEl = document.querySelector('.social__footer-text');

const bigImageEl = document.querySelector('.big-picture');
const closeBtnEl = document.querySelector('.big-picture__cancel');
const commentsEl = bigImageEl.querySelector('.social__comments');
const commentEl = bigImageEl.querySelector('.social__comment');

const fillComments = (photoComments) => {
  commentsEl.innerHTML = '';
  currentCount = 0;

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

  const commentsLength = comments.length;
  const shownComment = comments.slice(currentCount, currentCount + MAX_COMMENTS_COUNT);
  const renderedCommentsLength = shownComment.length + currentCount;

  if (commentsLength <= renderedCommentsLength) {
    commentLoaderEl.classList.add('hidden'); //ok
  }

  bigImageEl.querySelector('.social__comment-shown-count').textContent = renderedCommentsLength; //ok
  bigImageEl.querySelector('.social__comment-total-count').textContent = comments.length;//ok
  currentCount += MAX_COMMENTS_COUNT;

  fillComments(shownComment);
};

closeBtnEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  closePopup();
});

const onPopupEscKeydown = (evt) => onEscKeyDown(evt, closePopup);

const openPopup = (photo) => {
  fillPopup(photo);

  popupEl.classList.remove('hidden');

  commentInputEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  document.addEventListener('keydown', onPopupEscKeydown);
};

//function declaration to call it anywhere
function closePopup() {
  popupEl.classList.add('hidden');
  commentLoaderEl.classList.remove('hidden');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

export {openPopup};
