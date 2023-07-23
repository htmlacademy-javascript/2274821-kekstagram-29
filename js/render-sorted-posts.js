// Сортировка миниатюр фотографий других пользователей
const RERENDER_DELAY = 500;
import { createRandomPosts, showAlert, debounce } from './util.js';
import { data } from './api.js';
import { createMiniaturePosts } from './create-miniature-posts.js';

// Секция с фильтрами
const imageFilters = document.querySelector('.img-filters');
// По умолчанию
const imageFilterDefault = document.querySelector('#filter-default');
// Сортировка по умолчанию(при открытии страницы)
let currentFilter = imageFilterDefault.id;

// Делаем копию массива с сервера
const copyPosts = data.slice();

// <По умолчанию — фотографии в изначальном порядке с сервера(data)
// <Случайные — 10 случайных, не повторяющихся фотографий>
const randomData = createRandomPosts();

// <Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев>
// Сортируем посты по убыванию количества коментариев
const comparePosts = (postA, postB) => postB.comments.length - postA.comments.length;
// Показываем сначала посты с большим количеством комметариев
const discussedData = copyPosts.sort(comparePosts);

// Объект с вариантами сортировки постов
const SortOption = {
  'filter-default': data,
  'filter-random': randomData,
  'filter-discussed': discussedData,
};

const renderPosts = () => {
  const array = SortOption[currentFilter];
  try {
    createMiniaturePosts(array);
  } catch (err) {
    showAlert(err.message);
  }
};

// «устранение дребезга», чтобы при переключении фильтра обновление списка элементов,
// подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
const renderDebounce = debounce(renderPosts, RERENDER_DELAY);

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
    renderDebounce(currentFilter);
  });
};

export {renderSortedPosts};
