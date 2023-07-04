// Показывает и скрывает модальное окно

import {isEscapeKey} from './util.js';
import {createModalContent} from './get-detailed-post.js';

// const bigPhotoComments = document.querySelector('.social__comment');
const collectionPosts = document.querySelector('.pictures');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPhotoModal = document.querySelector('.big-picture');
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');

// Функция закрытия модального окна по кнопке ESС
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// /Открытие модального окна
const openModal = () => {
  // Показать окно
  bigPhotoModal.classList.remove('hidden');
  // Закрытие по ESC
  document.addEventListener('keydown', onDocumentKeydown);
  // После открытия окна спрячьте блоки счётчика комментариев
  // .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  document.body.classList.add('modal-open');
};

// Закрытие модального окна
const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  // Так как модальное окно закрыто, обработчик нам не нужен, поэтому удаляем его
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

closeBigPhotoModal.addEventListener('click', () => {
  closeModal();
});

closeBigPhotoModal.addEventListener('keydown', () => {
  if(isEscapeKey){
    closeModal();
  }
});

collectionPosts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let photoData;
  if(target !== null) {
    photoData = Number(target.dataset.id);
  }
  createModalContent(photoData);
  openModal();
});

// const onListClick = (evt) => {
//   if (evt.target.matches('img[class="picture__img"]')) {
//     openModal();
//     renderModal();
//   }
// };
// collectionPosts.addEventListener('click', onListClick);
