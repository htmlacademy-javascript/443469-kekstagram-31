const sliderEl = document.querySelector('.effect-level__slider');
const sliderValueEl = document.querySelector('.effect-level__value');
const imagePreviewEl = document.querySelector('.img-upload__preview img');
const effectsListEl = document.querySelector('.effects__list');
const effectBarEl = document.querySelector('.img-upload__effect-level');

const effectSettings = {
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.01,
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.01,
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 1,
    start: 1,
    step: 0.01,
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.01,
    units: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.01,
  },
};

noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.01,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const resetToOrigin = () => {
  effectBarEl.classList.add('hidden');
  imagePreviewEl.removeAttribute('style');
};

sliderEl.noUiSlider.on('update', () => {
  sliderValueEl.value = sliderEl.noUiSlider.get();
});

const onEffectButton = (evt) => {
  const targetButton = evt.target.closest('.effects__radio');

  if (targetButton) {
    const effectValue = targetButton.value;
    if (effectValue === 'none') {
      resetToOrigin();
    } else {
      const {min, max, start, step, filter, units} = effectSettings[effectValue];

      effectBarEl.classList.remove('hidden');
      sliderEl.noUiSlider.updateOptions({
        range: {
          min: min,
          max: max,
        },
        start: start,
        step: step,
        connect: 'lower',
      });
      sliderEl.noUiSlider.on('update', () => {
        imagePreviewEl.style.filter = `${filter}(${sliderValueEl.value}${units ?? ''})`;
      });
    }
  }
};

const initEffects = () => {
  resetToOrigin();
  effectsListEl.addEventListener('change', onEffectButton);
};

export {initEffects};
