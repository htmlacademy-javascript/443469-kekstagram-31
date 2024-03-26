import {isEscapeKey, onEscKeyDown, showErrorMessage} from './util.js';
import {initScale} from './scale.js';
import {initEffects} from './effects.js';
import {sendData} from './api';

const MAX_LENGTH_MESSAGE = 140;
const MAX_HASHTAGS_QUANTITY = 5;

const bodyEl = document.querySelector('body');
const uploadEl = document.querySelector('.img-upload__input');
const overlayEl = document.querySelector('.img-upload__overlay');
const closeBtnEl = document.querySelector('.img-upload__cancel');
const formEl = document.querySelector('.img-upload__form');
const commentEl = document.querySelector('.text__description');
const hashtagEl = document.querySelector('.text__hashtags');

const errorEl = document.querySelector('#error').content.querySelector('.error');
const successEl = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = errorEl.cloneNode(true);
const successTemplate = successEl.cloneNode(true);
const formSubmitEl = document.querySelector('#upload-submit');
const errorButtonEl = errorTemplate.querySelector('.error__button');
const successButtonEl = successTemplate.querySelector('.success__button');

const closeErrorPopup = () => {
  errorTemplate.remove();
};

const closeSuccessPopup = () => {
  successTemplate.remove();
};

errorButtonEl.addEventListener('click', closeErrorPopup);
successButtonEl.addEventListener('click', closeSuccessPopup);

const onSuccess = () => {
  formEl.submit();
  bodyEl.appendChild(successTemplate);
};

const onFail = () => {
  bodyEl.appendChild(errorTemplate);
};

const pristine = new Pristine(formEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

const blockSubmitButton = () => {
  formSubmitEl.textContent = 'Отправка...';
  formSubmitEl.disabled = true;
};

const unblockSubmitButton = () => {
  formSubmitEl.textContent = 'Опубликовать';
  formSubmitEl.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData)
      .then(() => {
        onSuccess();//todo esc and no redirect
        closeUploadPopup();
      })
      .catch(() => onFail())//todo esc
      .finally(unblockSubmitButton);
  }
};

const onOuterBodyClick = (evt) => {
  if (!evt.target.closest('.error__inner')) {
    closeErrorPopup();
  }
};

const onOuterBodyClick1 = (evt) => {
  if (!evt.target.closest('.success__inner')) {
    closeSuccessPopup();
  }
};

const onFormEscKeyDown = (evt) => onEscKeyDown(evt, closeUploadPopup);

const openUploadPopup = () => {
  overlayEl.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  initScale();
  initEffects();

  document.addEventListener('click', onOuterBodyClick); //todo
  document.addEventListener('click', onOuterBodyClick1); //todo
  document.addEventListener('keydown', onFormEscKeyDown);
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

  document.removeEventListener('click', onOuterBodyClick);
  document.removeEventListener('click', onOuterBodyClick1);
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
  pristine.addValidator(commentEl, validateComment, 'Длина комментария должна быть меньше 140 символов');
  pristine.addValidator(hashtagEl, validateHashtags, 'Введён невалидный хэштег');
};

export {addFormEventsValidation};
