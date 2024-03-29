import {onEscKeyDown} from './util.js';

const getPopupEl = (type) => {
  const template = document.querySelector(`#${type}`).content;
  const popupElement = template.querySelector(`.${type}`).cloneNode(true);

  popupElement.querySelector(`.${type}__button`).addEventListener('click', closeActivePopup);

  return popupElement;
};

const popups = {
  success: getPopupEl('success'),
  error: getPopupEl('error')
};

let activePopupType = null;
let globalEscKeydownCallback = null;

const onOutsideTarget = (evt) => {
  if (!evt.target.closest(`.${activePopupType}__inner`)) {
    closeActivePopup();
  }
};

const onPopupEscKeydown = (evt) => onEscKeyDown(evt, closeActivePopup);

const openPopup = (type) => {
  activePopupType = type;
  document.addEventListener('click', onOutsideTarget);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.body.append(popups[activePopupType]);
};

//function declaration to call it anywhere
function closeActivePopup() {
  popups[activePopupType].remove();
  activePopupType = null;

  document.removeEventListener('click', onOutsideTarget);
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('keydown', globalEscKeydownCallback);
}

const openSuccessPopup = () => openPopup('success');
const openErrorPopup = (escKeydownCallback) => {
  globalEscKeydownCallback = escKeydownCallback;
  openPopup('error');
};

export {openSuccessPopup, openErrorPopup};
