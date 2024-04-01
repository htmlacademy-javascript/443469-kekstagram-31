const Scale = {
  MAX_SCALE: 100,
  STEP: 25
};

const scaleSmallEl = document.querySelector('.scale__control--smaller');
const scaleLargeEl = document.querySelector('.scale__control--bigger');
const scaleValueEl = document.querySelector('.scale__control--value');
const imagePreviewEl = document.querySelector('.img-upload__preview img');

const changeScale = (step) => {
  let value = parseInt(scaleValueEl.value, 10);
  value += step;
  if (value > Scale.MAX_SCALE || value < Scale.STEP) {
    return false;
  }
  scaleValueEl.value = `${value}%`;
  imagePreviewEl.style.transform = `scale(${value / Scale.MAX_SCALE})`;
};

const initScale = () => {
  imagePreviewEl.style.transform = '';

  scaleSmallEl.addEventListener('click', () => {
    changeScale(-Scale.STEP);
  });

  scaleLargeEl.addEventListener('click', () => {
    changeScale(Scale.STEP);
  });
};

export {initScale};
