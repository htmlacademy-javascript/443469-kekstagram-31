// import {isEscapeKey} from './util.js';
//
// const popupEl = document.querySelector('.big-picture');
// const commentCountEl = document.querySelector('.social__comment-count');
// const commentLoaderEl = document.querySelector('.comments-loader');
//
// const onDocumentKeydown = (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     closeUserModal();
//   }
// };
//
// function openUserModal() {
//   popupEl.classList.remove('hidden');
//   commentCountEl.classList.add('hidden');
//   commentLoaderEl.classList.add('hidden');
//
//   document.addEventListener('keydown', onDocumentKeydown);
// }
//
// function closeUserModal() {
//   popupEl.classList.add('hidden');
//   commentCountEl.classList.remove('hidden');
//   commentLoaderEl.classList.remove('hidden');
//
//   document.removeEventListener('keydown', onDocumentKeydown);
// }
//
// export {openUserModal, closeUserModal};
