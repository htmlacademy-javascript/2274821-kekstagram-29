// Заполняет модальное окно необходимыми данными (на основе элемента, на который кликнули и нашего массива с данными)
import { arrayOfPosts } from './data.js';

const bigPhotoImage = document.querySelector('.big-picture__img');
const bigPhotoLikes = document.querySelector('.likes-count');
const bigPhotoCountComments = document.querySelector('.comments-count');
const bigPhotoDescription = document.querySelector('.social__caption');


const createModalContent = (photoData) => {
  const currentPost = arrayOfPosts.find((post) => photoData === post.id);
  const {url, likes, comments, description} = currentPost;
  bigPhotoImage.src = url;
  bigPhotoLikes.textContent = likes;
  bigPhotoCountComments.textContent = comments.length;
  bigPhotoDescription.textContent = description;
};

export {createModalContent};
