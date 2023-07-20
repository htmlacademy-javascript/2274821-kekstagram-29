// Сортировка миниатюр фотографий других пользователей

// Массив с сервера
import {data} from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';
import { showAlert } from './util.js';
import { generateArrayUniqueNumbers } from './util.js';
// Секция с фильтрами
const imageFilters = document.querySelector('.img-filters');
// Контейнер, в котором лежат фильтры
const imageFilterForm = document.querySelector('.img-filters__form');
// По умолчанию
const imageFilterDefault = document.querySelector('.filter-default');
// Случайные
const imageFilterRandom = document.querySelector('.filter-random');
// Обсуждаемые
const imageFilterDiscussed = document.querySelector('.filter-discussed');

// По умолчанию — фотографии в изначальном порядке с сервера - передаем в main полученный с сервера массив data

try {
  imageFilters.classList.remove('img-filters--inactive');
  createMiniaturePosts(data);
} catch (err) {
  showAlert(err.message);
}

// <Случайные — 10 случайных, не повторяющихся фотографий>
// Генерируем 10 неповторяющихся чисел
const randomNumbers = generateArrayUniqueNumbers(1, 25);
const createRandomPosts = () => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = data.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

const randomData = createRandomPosts();

// try {
//   imageFilters.classList.remove('img-filters--inactive');
//   createMiniaturePosts(randomData);
// } catch (err) {
//   showAlert(err.message);
// }


// Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев
