import {isEscapeKey} from './util.js';

const bodyEl = document.querySelector('body');
const uploadEl = document.querySelector('.img-upload__input');
const overlayEl = document.querySelector('.img-upload__overlay');
const closeBtnEl = document.querySelector('.img-upload__cancel');
const formEl = document.querySelector('.img-upload__form');
const btnSendEl = document.querySelector('.img-upload__submit');
const commentEl = document.querySelector('.text__description');
const hashtagEl = document.querySelector('.text__hashtags');

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const onImageSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
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

  document.addEventListener('keydown', onDocumentKeydown);
};

const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => hashtag.test(value);
const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  commentEl,
  validateComment,
  'Длина комментария должна быть меньше 140 символов'
);

pristine.addValidator(
  hashtagEl,
  validateHashtag,
  'Введён невалидный хэштег, введите хэштег в формате #хештег'
);

btnSendEl.addEventListener('click', onImageSubmit);

// formEl.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   pristine.validate();
// });

closeBtnEl.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadPopup();
});

commentEl.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

uploadEl.addEventListener('change', openUploadPopup);


//function declaration to call it anywhere
function closeUploadPopup() {
  formEl.reset();
  overlayEl.classList.add('hidden');
  bodyEl.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}
