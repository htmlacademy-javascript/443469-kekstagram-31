import {NUMBER_OBJECTS} from './mocks/consts.js';
import {generatePublishedPhotos} from './mocks/content.js';
import {createThumbnails} from './create-photos.js';
import './generate-content-popup.js';

const getPublishedPhotos = generatePublishedPhotos(NUMBER_OBJECTS);

createThumbnails(getPublishedPhotos);

// console.log(getPublishedPhotos);
