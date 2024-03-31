const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const previewEl = document.querySelector('.img-upload__preview img');
const previewMiniatures = document.querySelectorAll('.effects__preview');

const checkFileTypes = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const initFileChooser = (file) => {
  previewEl.src = URL.createObjectURL(file);
  previewMiniatures.forEach((preview) => {
    preview.style.backgroundImage = `url(${previewEl.src})`;
  });
};

export {initFileChooser, checkFileTypes};
