// Показывает и скрывает модальное окно

import {isEscapeKey} from './util.js';
import {createModalContent} from './get-detailed-post.js';
import {renderComments} from './comments-list.js';

const collectionPosts = document.querySelector('.pictures');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPhotoModal = document.querySelector('.big-picture');
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');

// <Закрытие модального окна>
const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  // Так как модальное окно закрыто, обработчик нам не нужен, поэтому удаляем его
  window.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
};

// <Открытие модального окна>
const openModal = () => {
  // Показать окно
  bigPhotoModal.classList.remove('hidden');
  // Закрытие модального окна по нажатию на крестик
  closeBigPhotoModal.addEventListener('click', () => {
    closeModal();
  });
  // Закрытие по ESC
  window.addEventListener('keydown', onDocumentKeydown);
  // После открытия окна спрячьте блоки счётчика комментариев
  // .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden
  socialCommentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  // После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле.
  document.body.classList.add('modal-open');
};

// Функция закрытия модального окна по кнопке ESС
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

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
