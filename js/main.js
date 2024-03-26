import {getData} from './api.js';
import {showErrorMessage} from './util.js';
import {createThumbnails} from './create-photos.js';
import {addFormEventsValidation} from './form.js';

getData()
  .then((photos) => createThumbnails(photos))
  .catch((err) => showErrorMessage(err.message));

addFormEventsValidation();
