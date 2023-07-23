// Сортировка миниатюр фотографий других пользователей

// Массив с сервера
import {data} from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';
import { showAlert, generateArrayUniqueNumbers} from './util.js';
// Секция с фильтрами
const imageFilters = document.querySelector('.img-filters');
// По умолчанию
const imageFilterDefault = document.querySelector('#filter-default');
// Случайные
const imageFilterRandom = document.querySelector('#filter-random');
// Обсуждаемые
const imageFilterDiscussed = document.querySelector('#filter-discussed');
// Делаем копию массива с сервера
const copyPosts = data.slice();
// Сортировка по умолчанию(при открытии страницы)
let currentFilter = imageFilterDefault.id;

// <По умолчанию — фотографии в изначальном порядке с сервера - передаем в main полученный с сервера массив data>
// <Случайные — 10 случайных, не повторяющихся фотографий>
// Генерируем 10 неповторяющихся чисел от 1 до 25, т.к. в данном случае массив с сервера содержит только 25 постов
const randomNumbers = generateArrayUniqueNumbers(1, 25);
const createRandomPosts = () => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = data.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};
// Показываем 10 случайных неповторяющихся постов
const randomData = createRandomPosts();

// <Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев>
// Сортируем посты по убыванию количества коментариев
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
// Показываем сначала посты с большим количеством комметариев
const discussedData = copyPosts.sort(comparePosts);

// Объект с вариантами сортировки постов
const SortOption = {
  'filter-default': {
    array: data,
    button: imageFilterDefault,
  },
  'filter-random': {
    array: randomData,
    button: imageFilterRandom,
  },
  'filter-discussed': {
    array: discussedData,
    button: imageFilterDiscussed,
  },
};

const renderPosts = () => {
  const array = SortOption[currentFilter].array;
  try {
    createMiniaturePosts(array);
  } catch (err) {
    showAlert(err.message);
  }
};

const renderSortedPosts = () => {
  renderPosts(currentFilter);
  imageFilters.classList.remove('img-filters--inactive');
  imageFilters.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    imageFilters.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    currentFilter = evt.target.id;
    renderPosts(currentFilter);
  });
};

renderSortedPosts();
