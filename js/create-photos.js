const photoTemplateEl = document.querySelector('#picture').content.querySelector('.picture');
const photoFragment = document.createDocumentFragment();
const photoResultContainerEl = document.querySelector('.pictures');

const createPhotoThumb = ({url, description, likes, comments}) => {
  const imageThumbnail = photoTemplateEl.cloneNode(true);
  const imageEl = imageThumbnail.querySelector('.picture__img');

  imageEl.src = url;
  imageEl.alt = description;
  imageThumbnail.querySelector('.picture__likes').textContent = likes;
  imageThumbnail.querySelector('.picture__comments').textContent = comments.length;

  return imageThumbnail;
};

const createThumbnails = (thumbnails) => {
  thumbnails.forEach((photo) => {
    const imageThumbnail = createPhotoThumb(photo);
    photoFragment.appendChild(imageThumbnail);
  });

  photoResultContainerEl.appendChild(photoFragment);
};

export {createThumbnails};
