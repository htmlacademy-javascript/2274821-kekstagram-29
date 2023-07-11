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
const commentAvatar = templateComment.querySelector('.social__picture');
const commentText = templateComment.querySelector('.social__text');
const commentsLoader = document.querySelector('.comments-loader');
const shownComments = document.querySelector('.shown-comments');
const arrayOfComments = [];
let countShownComments = 0;
let countPartComments = 0;
const onLoadButtonClick = () => renderSomeComment();

// <Закрытие модального окна>
const closeModal = () => {
  bigPhotoModal.classList.add('hidden');
  // Так как модальное окно закрыто, обработчик нам не нужен, поэтому удаляем его
  window.removeEventListener('keydown', onDocumentKeydown);
  commentsLoader.removeEventListener('click', onLoadButtonClick);
  document.body.classList.remove('modal-open');
  countShownComments = 0;
  arrayOfComments.length = 0;
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

// Создает список комментариев под фотографией
const createComments = (comments) => {
  comments.forEach(({avatar, name, message}) => {
    // Копируем "шаблон" комментария из разметки
    const comment = templateComment.cloneNode(true);
    // Заменяем данные
    commentAvatar.src = avatar;
    commentAvatar.alt = name;
    commentText.textContent = message;
    // Добавляем комментарии в массив
    arrayOfComments.push(comment);
  });
  return arrayOfComments;
};

// Функция, которая получает id поста, на который кликнули и подставляет в модальное окно его данные
const createModalContent = (postId) => {
  const currentPost = arrayOfPosts.find((post) => postId === post.id);
  const {likes, url, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
  createComments(comments);
};

const showPartComments = () => {
  shownComments.textContent = countShownComments;
  const part = arrayOfComments.slice(countPartComments, countShownComments);
  for (let a = 0; a < part.length; a++) {
    bigPhotoComments.append(part[a]);
  }
};

function renderSomeComment () {
  countPartComments = countShownComments;
  // Если количество оставшихся непоказанных комментариев больше, чем QUANTITY_OF_COMMENTS, то показываем еще 5 комментариев
  if (arrayOfComments.length - countShownComments > QUANTITY_OF_COMMENTS) {
    countShownComments += QUANTITY_OF_COMMENTS;
  } else {
    // Если количество оставшихся непоказанных комментариев меньше, чем QUANTITY_OF_COMMENTS, то показываем те, что остались и скрываем "Загрузить еще"
    countShownComments += arrayOfComments.length - countShownComments;
    commentsLoader.classList.add('hidden');
  }
  showPartComments();

}

const showComments = () => {
  // Если комментариев меньше или равно QUANTITY_OF_COMMENTS, то выводим те, что есть и скрываем кнопку "Загрузить еще"
  if (arrayOfComments.length <= QUANTITY_OF_COMMENTS) {
    commentsLoader.classList.add('hidden');
    countShownComments = arrayOfComments.length;
    shownComments.textContent = countShownComments;
    for (let i = 0; i < countShownComments; i++) {
      bigPhotoComments.append(arrayOfComments[i]);
    }
  } else {
    // Если комментариев больше, чем QUANTITY_OF_COMMENTS, то показываем кнопку "Загрузить еще", показываем первые 5 комментариев и добавляем слушатель на "Загрузить еще"
    commentsLoader.classList.remove('hidden');
    countPartComments = 0;
    countShownComments = QUANTITY_OF_COMMENTS;
    showPartComments();
    commentsLoader.addEventListener('click', onLoadButtonClick);
  }
};

// Показывает наполненное окно по клику
collectionPosts.addEventListener('click', (evt) => {
  bigPhotoComments.innerHTML = '';
  const target = evt.target.closest('.picture');
  let postId;
  if(target !== null) {
    postId = Number(target.dataset.id);
  }
  createModalContent(postId);
  showComments();
  openModal();
});
