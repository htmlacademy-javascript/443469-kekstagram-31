const ALERT_SHOW_TIME = 5000;
const DEBOUNCE_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const onEscKeyDown = (evt, callbackFunc) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    callbackFunc();
  }
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorEl = errorTemplate.cloneNode(true);

  document.body.append(errorEl);

  const errorBarEl = document.querySelector('.data-error');

  setTimeout(() => {
    errorBarEl.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showErrorMessage, isEscapeKey, onEscKeyDown, debounce};
