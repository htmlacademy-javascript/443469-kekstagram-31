import {debounce} from './util.js';
import {createThumbnails} from './create-photos.js';

const MAX_PHOTO_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';

const MenuFilter = {
  DEFAULT: 'DEFAULT',
  RANDOM: 'RANDOM',
  DISCUSSED: 'DISCUSSED'
};

const filtersEl = document.querySelector('.img-filters__form');
const defaultFilterEl = document.querySelector('#filter-default');
const randomFilterEl = document.querySelector('#filter-random');
const discussedFilterEl = document.querySelector('#filter-discussed');

let activeFilterButton = null;
let filterButtonLoaded = null;
let photos = [];

const clearPhotos = () => {
  document.querySelectorAll('a.picture').forEach((photo) => photo.remove());
};

const onChangeFilter = (evt) => {
  const target = evt.target.closest('button');
  const activeButtonEl = document.querySelector(`.${ACTIVE_CLASS}`);

  if (target && target === activeButtonEl) {
    return;
  }

  if (target && !target.classList.contains(ACTIVE_CLASS)) {
    activeButtonEl.classList.toggle(ACTIVE_CLASS);
    target.classList.toggle(ACTIVE_CLASS);
  }
};

const loadData = (data, clickedFilterButton) => {
  if (filterButtonLoaded !== clickedFilterButton) {
    filterButtonLoaded = clickedFilterButton;
    clearPhotos();
    createThumbnails(data);
  }
};

const debounceRender = debounce(loadData);

const handleMenuItemClick = (clickedFilterButton) => {
  if (activeFilterButton !== clickedFilterButton) {
    activeFilterButton = clickedFilterButton;

    let thumbnailsData;

    switch (clickedFilterButton) {
      case MenuFilter.DEFAULT:
        thumbnailsData = photos;
        break;
      case MenuFilter.RANDOM:
        thumbnailsData = photos.slice().sort(() => 0.5 - Math.random()).slice(0, MAX_PHOTO_COUNT);
        break;
      case MenuFilter.DISCUSSED:
        thumbnailsData = photos.slice().sort((a, b) => b.comments.length - a.comments.length);
        break;
      default:
        throw new Error('Unsupported type: ' + clickedFilterButton);
    }

    debounceRender(thumbnailsData, clickedFilterButton);
  }
};

const initThumbnails = (photosServer) => {
  photos = photosServer;
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  filtersEl.addEventListener('click', onChangeFilter);

  defaultFilterEl.addEventListener('click', () => handleMenuItemClick(MenuFilter.DEFAULT));
  randomFilterEl.addEventListener('click', () => handleMenuItemClick(MenuFilter.RANDOM));
  discussedFilterEl.addEventListener('click', () => handleMenuItemClick(MenuFilter.DISCUSSED));

  handleMenuItemClick(MenuFilter.DEFAULT);
};

export {initThumbnails};
