// Показывает и скрывает модальное окно

import {isEscapeKey} from './util.js';
import {createModalContent} from './get-detailed-post.js';
import {renderComments} from './comments-list.js';

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

// <Закрытие модального окна>
const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  // Так как модальное окно закрыто, обработчик нам не нужен, поэтому удаляем его
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};
// Закрытие модального окна по нажатию на крестик
closeBigPhotoModal.addEventListener('click', () => {
  closeModal();
});
// Закрытие модального окна по нажатию на Esc
window.addEventListener('keydown', () => {
  if(isEscapeKey){
    closeModal();
  }
});

// <Открытие модального окна>
const openModal = () => {
  // Показать окно
  bigPhotoModal.classList.remove('hidden');
  // Закрытие модального окна по нажатию на крестик
  closeBigPhotoModal.addEventListener('click', () => {
    closeModal();
  });
  // Закрытие по ESC
  document.addEventListener('keydown', onDocumentKeydown);
  // После открытия окна спрячьте блоки счётчика комментариев
  // .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  document.body.classList.add('modal-open');
};

// Показывает наполненное окно по клику
collectionPosts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let postId;
  if(target !== null) {
    postId = Number(target.dataset.id);
  }
  renderComments(postId);
  createModalContent(postId);
  openModal();
});
