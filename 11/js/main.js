import {NUMBER_OBJECTS} from './mocks/consts.js';
import {generatePublishedPhotos} from './mocks/content.js';
import {createThumbnails} from './create-photos.js';
import {onCheckFormValidation} from './form.js';

const getPublishedPhotos = generatePublishedPhotos(NUMBER_OBJECTS);

createThumbnails(getPublishedPhotos);
onCheckFormValidation();

// console.log(getPublishedPhotos);
