//Импортируем модуль для генерации данных
import {arrayOfPhotos} from './data.js';

// Ищем в разметке куда будем вставлять сгенерированные фотографии
const allPostsList = document.querySelector('.pictures');

//Ищем шаблон в разметке
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPhotos = arrayOfPhotos();

// Cоздаем "коробочку"
const allPosts = document.createDocumentFragment();

// Склонируем шаблон и вставим в нужное место на странице, добавим сгенерированные данные
createPhotos.forEach((post) => {
  // Клонируем шаблон
  const postElement = postTemplate.cloneNode(true);
  // Адрес изображения url подставьте как атрибут src изображения
  postElement.querySelector('.picture__img').src = post.url;
  // Описание изображения description подставьте в атрибут alt изображения.
  postElement.querySelector('.picture__img').alt = post.description;
  // Количество лайков likes выведите в блок .picture__likes.
  postElement.querySelector('.picture__likes').textContent = post.likes;
  // Количество комментариев comments выведите в блок .picture__comments.
  postElement.querySelector('.picture__comments').textContent = post.comments.length;
  // Складываем все элементы в "коробочку"
  allPosts.append(postElement);
});
// Складываем в определенное место в разметке "коробочки" с разными постами
allPostsList.append(allPosts);
