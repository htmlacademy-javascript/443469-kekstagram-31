import {getData} from './api.js';
import {showErrorMessage} from './util.js';
import {createThumbnails} from './create-photos.js';
import {addFormEventsValidation} from './form.js';

getData()
  .then((photos) => createThumbnails(photos))
  .then(()=> document.querySelector('.img-filters').classList.remove('img-filters--inactive'))
  .catch((err) => showErrorMessage(err.message));

addFormEventsValidation();
