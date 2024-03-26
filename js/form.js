import {isEscapeKey} from './util.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';

const MAX_LENGTH_MESSAGE = 140;
const MAX_HASHTAGS_QUANTITY = 5;

const bodyEl = document.querySelector('body');
const uploadEl = document.querySelector('.img-upload__input');
const overlayEl = document.querySelector('.img-upload__overlay');
const closeBtnEl = document.querySelector('.img-upload__cancel');
const formEl = document.querySelector('.img-upload__form');
const commentEl = document.querySelector('.text__description');
const hashtagEl = document.querySelector('.text__hashtags');

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    const formData = new FormData(evt.target);
    fetch(
      'https://31.javascript.htmlacadem.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
    formEl.submit();
    closeUploadPopup();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
};

const openUploadPopup = () => {
  overlayEl.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  initScale();
  initEffects();

  document.addEventListener('keydown', onDocumentKeydown);
};

const validateHashtag = (hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag);

const areUniqueHashtags = (hashtags) => {
  const lowerCaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.filter((hashtag, index) => lowerCaseHashtags.indexOf(hashtag) === index).length === lowerCaseHashtags.length;
};

const validateHashtags = (hashtagsScope) => {
  if (!hashtagsScope.trim()) {
    return true;
  }
  const hashtags = hashtagsScope.split(' ');
  return hashtags.every((hashtag) => validateHashtag(hashtag)) && hashtags.length <= MAX_HASHTAGS_QUANTITY && areUniqueHashtags(hashtags);
};

const validateComment = (comment) => comment.length <= MAX_LENGTH_MESSAGE;

//function declaration to call it anywhere
function closeUploadPopup() {
  formEl.reset();
  pristine.reset();
  overlayEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const addFormEventsValidation = () => {
  formEl.addEventListener('submit', onFormSubmit);

  closeBtnEl.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeUploadPopup();
  });

  commentEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  hashtagEl.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.stopPropagation();
    }
  });

  uploadEl.addEventListener('change', openUploadPopup);
  pristine.addValidator(commentEl, validateComment, 'Длина комментария должна быть меньше 140 символов');
  pristine.addValidator(hashtagEl, validateHashtags, 'Введён невалидный хэштег');
};

export {addFormEventsValidation};
