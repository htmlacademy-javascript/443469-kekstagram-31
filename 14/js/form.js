import {isEscapeKey, onEscKeyDown, showErrorMessage} from './util.js';
import {openSuccessPopup, openErrorPopup} from './secondary-popup.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';
import {checkFileTypes, initFileChooser} from './select-photo.js';
import {sendData} from './api.js';

const MAX_LENGTH_MESSAGE = 140;
const MAX_HASHTAGS_QUANTITY = 5;

const FormButtonText = {
  IN_PROCESS: 'Отправка...',
  PUBLISH: 'Опубликовать',
};

const ValidationMessages = {
  COMMENT: 'Длина комментария должна быть меньше 140 символов',
  HASHTAGS: 'Введён невалидный хэштег',
  PHOTO: 'Неверный формат фото'
};

const bodyEl = document.querySelector('body');
const uploadEl = document.querySelector('#upload-file');
const overlayEl = document.querySelector('.img-upload__overlay');
const closeBtnEl = document.querySelector('.img-upload__cancel');
const formEl = document.querySelector('.img-upload__form');
const commentEl = document.querySelector('.text__description');
const hashtagEl = document.querySelector('.text__hashtags');
const formSubmitEl = document.querySelector('#upload-submit');

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const setSubmitButtonState = (text, disabled) => {
  formSubmitEl.textContent = text;
  formSubmitEl.disabled = disabled;
};

const onFormEscKeyDown = (evt) => onEscKeyDown(evt, closeUploadPopup);

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    setSubmitButtonState(FormButtonText.IN_PROCESS, true);
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        openSuccessPopup();
        closeUploadPopup();
      })
      .catch(() => {
        document.removeEventListener('keydown', onFormEscKeyDown);
        openErrorPopup(onFormEscKeyDown);
      })
      .finally(() => setSubmitButtonState(FormButtonText.PUBLISH, false));
  }
};

const openUploadPopup = () => {
  const file = uploadEl.files[0];

  overlayEl.classList.remove('hidden');
  bodyEl.classList.add('modal-open');

  if (checkFileTypes(file)) {
    initFileChooser(file);
    initScale();
    initEffects();
    document.addEventListener('keydown', onFormEscKeyDown);
  } else {
    closeUploadPopup();
    showErrorMessage(ValidationMessages.PHOTO);
  }
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

  document.removeEventListener('keydown', onFormEscKeyDown);
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
  pristine.addValidator(commentEl, validateComment, ValidationMessages.COMMENT);
  pristine.addValidator(hashtagEl, validateHashtags, ValidationMessages.HASHTAGS);
};

export {addFormEventsValidation};
