const ALERT_SHOW_TIME = 5000;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#data-error').content;
  const errorEl = errorTemplate.cloneNode(true);

  document.body.append(errorEl);

  const errorBarEl = document.querySelector('.data-error');

  setTimeout(() => {
    errorBarEl.remove();
  }, ALERT_SHOW_TIME);
};

export {showErrorMessage, isEscapeKey};
