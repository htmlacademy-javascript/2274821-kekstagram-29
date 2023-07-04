// Импортируем сгенерированные миниатюры фотографий
import './create-posts.js';
import {isEscapeKey} from './util.js';

// Получаем коллекцию со сгенерированными постами
const collectionOfPosts = document.querySelectorAll('.picture');
// Блок с фотографиями других пользователей
const collect = document.querySelector('.pictures');
// Окно полноразмерной фотографии
const bigPhotoModal = document.querySelector('.big-picture');
// Кнопка закрытия окна
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');

const bigPhotoImage = document.querySelector('.big-picture__img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');
const bigPhotoComments = document.querySelector('.social__comment');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');

// Функция закрытия модального окна по кнопке ESС
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

// Открытие модального окна
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

// Создание контента модального окна
const renderModal = () => {

  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
//   bigPhotoComments.insertAdjacentHTML = <li class="social__comment"><img
//       class="social__picture"
//       src="{{аватар}}"
//       alt="{{имя комментатора}}"
//       width="35" height="35">
//   <p class="social__text">{{текст комментария}}</p>
// </li>
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

// Если нажатие происходит на элемент коллекции, то модальное окно открывается и заполняется необходимым контентом
collectionOfPosts.forEach((element) => {
  element.addEventListener('click', () => {
    openModal();
    renderModal();
  });
});

// Не работает...
// const onListClick = (evt) => {
//   if(evt.target.nodeName === 'a') {
//     openModal();
//   }
// };
// collectionOfPosts.addEventListener('click', onListClick);

// Почему это не работает??
// for (let i = 0; i <= collectionOfPosts.length; i++) {
//   collectionOfPosts[i].addEventListener('click', () => {
//     console.log(i);
//     openModal();
//   });
// }
