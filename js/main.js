import {NUMBER_OBJECTS} from './mocks/consts.js';
import {generatePublishedPhotos} from './mocks/content.js';
import {createThumbnails} from './create-photos.js';
import './form.js';

const getPublishedPhotos = generatePublishedPhotos(NUMBER_OBJECTS);

createThumbnails(getPublishedPhotos);

// console.log(getPublishedPhotos);
