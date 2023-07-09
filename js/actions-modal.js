// Показывает и скрывает модальное окно
const QUANTITY_OF_COMMENTS = 5;

import {isEscapeKey} from './util.js';
import {arrayOfPosts} from './data.js';

const collectionPosts = document.querySelector('.pictures');
const bigPhotoModal = document.querySelector('.big-picture');
const closeBigPhotoModal = document.querySelector('.big-picture__cancel');
const bigPhotoImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');
const bigPhotoComments = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');
const commentsLoader = document.querySelector('.social__comments-loader');
const shownComments = document.querySelector('.shown-comments');
const arrayOfComments = [];
let shown = 0;


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

// Функция, которая получает id поста, на который кликнули и подставляет в модальное окно его данные
const createModalContent = (postId) => {
  const currentPost = arrayOfPosts.find((post) => postId === post.id);
  const {likes, url, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

// Создает список комментариев под фотографией
const createComments = (postId) => {
  const clickPost = arrayOfPosts.find((post) => postId === post.id);
  const currentComments = clickPost.comments;

  currentComments.forEach(({avatar, name, message}) => {
    // Копируем "шаблон" комментария из разметки
    const comment = templateComment.cloneNode(true);
    // Заменяем данные
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    // Добавляем комментарии в массив
    arrayOfComments.push(comment);
  });
  return arrayOfComments;
};

// Загружаем определенное количество комментов
const showSomeComments = () => {
  bigPhotoComments.innerHTML = '';
  shownComments.textContent = shown;
  for (let i = 0; i < shown; i++) {
    bigPhotoComments.append(arrayOfComments[i]);
  }
};

// Загружаем в коллекцию нужный кусочек комментов
const showPartComments = () => {
  bigPhotoComments.innerHTML = '';
  shownComments.textContent = shown;
  const part = arrayOfComments.slice(0, shown);
  for (let a = 0; a < part.length; a++) {
    bigPhotoComments.append(part[a]);
  }
};

// Показываем нужное количество комментариев
const showComments = () => {
  // Если комментариев меньше, чем QUANTITY_OF_COMMENTS, то выводим те. что есть и скрываем кнопку "Загрузить еще"
  if (arrayOfComments.length < QUANTITY_OF_COMMENTS) {
    commentsLoader.classList.add('hidden');
    shown = arrayOfComments.length;
    showSomeComments();
    arrayOfComments.length = 0;
    // Если комментариев больше, чем QUANTITY_OF_COMMENTS, то показываем кнопку "Загрузить еще" и показываем первые 5 комментариев
  } else {
    commentsLoader.classList.remove('hidden');
    shown = QUANTITY_OF_COMMENTS;
    showSomeComments();
    // Создаем обработчик по клику на "Загрузить еще"
    commentsLoader.addEventListener('click', () => {
      // Если количество оставшихся непоказанных комментариев больше, чем QUANTITY_OF_COMMENTS, то добавляем еще кусочек комментариев равный QUANTITY_OF_COMMENTS
      if (arrayOfComments.length - shown >= QUANTITY_OF_COMMENTS) {
        shown += QUANTITY_OF_COMMENTS;
        showPartComments();
      } else {
        // Если количество оставшихся непоказанных комментариев меньше, чем QUANTITY_OF_COMMENTS, то показываем те, что остались и скрываем "Загрузить еще"
        shown += arrayOfComments.length - shown;
        showPartComments();
        commentsLoader.classList.add('hidden');
      }
    });
  }
};

// Показывает наполненное окно по клику
collectionPosts.addEventListener('click', (evt) => {
  const target = evt.target.closest('.picture');
  let postId;
  if(target !== null) {
    postId = Number(target.dataset.id);
  }
  createComments(postId);
  showComments();
  createModalContent(postId);
  openModal();
});
