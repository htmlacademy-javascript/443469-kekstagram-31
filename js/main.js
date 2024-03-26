import {createThumbnails} from './create-photos.js';
import {addFormEventsValidation} from './form.js';

addFormEventsValidation();

fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createThumbnails(photos);
  });


// console.log(getPublishedPhotos);
