// Создает список комментариев под фотографией

import { arrayOfPosts } from './data.js';

// Список всех комментариев
const bigPhotoComments = document.querySelector('.social__comments');
const templateComment = document.querySelector('.social__comment');

const renderComments = (postId) => {
  const clickPost = arrayOfPosts.find((post) => postId === post.id);
  const currentComments = clickPost.comments;
  // Создаем коробочку для комментариев
  const commentsContainer = document.createDocumentFragment();
  currentComments.forEach(({avatar, name, message}) => {
    // Копируем "шаблон" комментария из разметки
    const comment = templateComment.cloneNode(true);
    // Заменяем данные
    comment.querySelector('.social__picture').src = avatar;
    comment.querySelector('.social__picture').alt = name;
    comment.querySelector('.social__text').textContent = message;
    // складываем комментарии в коробочку
    commentsContainer.append(comment);
  });
  // Очистищаем коллекцию
  bigPhotoComments.innerHTML = '';
  // Складываем коробочки с комментариями в коллекцию
  bigPhotoComments.append(commentsContainer);
};

export {renderComments};

