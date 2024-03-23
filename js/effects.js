const sliderEl = document.querySelector('.effect-level__slider');
const sliderValueEl = document.querySelector('.effect-level__value');
const imagePreviewEl = document.querySelector('.img-upload__preview img');
const effectsListEl = document.querySelector('.effects__list');
const effectsListItemEl = document.querySelector('.effects__item');
const effectBarEl = document.querySelector('.img-upload__effect-level');
const effectsRadioButtonsEl = document.querySelectorAll('.effects__radio');

noUiSlider.create(sliderEl, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.01,
  connect: 'lower',
});

const resetEffects = () => {
  //удалить атрибут фильтр
  effectBarEl.classList.add('hidden');
  imagePreviewEl.classList.add('.effects__preview--none');
};

sliderEl.noUiSlider.on('update', () => {
  sliderValueEl.value = sliderEl.noUiSlider.get();
});


const onEffectChange = () => {
  effectsRadioButtonsEl.forEach((button) => {
    if (button.checked) {
      if (button.value !== 'none') {
        effectBarEl.classList.remove('hidden');

        if (button.value === 'chrome') {
          imagePreviewEl.style.filter = `grayscale(${sliderValueEl.value})`;
          sliderEl.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 1
            },
            step: 0.1
          });
        } else {
          if (button.value === 'chrome') {
            imagePreviewEl.style.filter = `sepia(${sliderValueEl.value})`;
            sliderEl.noUiSlider.updateOptions({
              range: {
                min: 1,
                max: 1
              },
              step: 0.1
            });
          }
        }
      }

    } else {
      resetEffects();
    }
  });
};

const onEffectButton = (evt) => {
  const targetButton = evt.target.closest('.effects__radio');

  if (targetButton) {
    const effValue = targetButton.value;
    if (effValue === 'none') {
      effectBarEl.classList.add('hidden');
    } else {
      effectBarEl.classList.remove('hidden');
    }
    imagePreviewEl.removeAttribute('class');
    imagePreviewEl.classList.add(`effects__preview--${effValue}`);
  }
};

const initEffects = () => {
  effectBarEl.classList.add('hidden');
  imagePreviewEl.removeAttribute('class');
  effectsListEl.addEventListener('click', onEffectButton);
};

export {initEffects};
