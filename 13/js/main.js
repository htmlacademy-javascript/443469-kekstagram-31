import {getData} from './api.js';
import {showErrorMessage} from './util.js';
import {initThumbnails} from './create-photos.js';
import {addFormEventsValidation} from './form.js';

getData()
  .then((photos) => initThumbnails(photos))
  .catch((err) => showErrorMessage(err.message));

addFormEventsValidation();
