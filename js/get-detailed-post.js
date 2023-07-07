// Заполняет модальное окно необходимыми данными (на основе элемента, на который кликнули и нашего массива с данными)
import { arrayOfPosts } from './data.js';

const bigPhotoImage = document.querySelector('.big-picture__img').querySelector('img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');

// Функция, которая получает id поста, на который кликнули и подставляет в модальное окно его данные
const createModalContent = (postId) => {
  const currentPost = arrayOfPosts.find((post) => postId === post.id);
  const {likes, url, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

export {createModalContent};
