const ALERT_SHOW_TIME = 5000;
const FILTER_SHOW_PHOTO = 10;

import { data } from './api.js';

// Показываем ошибку на главной странице
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.top = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

// Проверка, является ли нажатая кнопка Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Для сортировки постов
// Генерация случайного числа в диапазоне, т.к. в данном случае колличество фотографий с сервера ограничено
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Генерация массива из FILTER_SHOW_PHOTO (10) неповторяющихся чисел
const generateArrayUniqueNumbers = (a, b) => {
  const numbers = [];
  while (numbers.length < FILTER_SHOW_PHOTO) {
    const randomNumber = getRandomInteger(a, b);
    let found = false;
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] === randomNumber){
        found = true;
        break;
      }
    }
    if (!found) {
      numbers[numbers.length] = randomNumber;
    }
  }
  return numbers;
};

// Генерируем 10 неповторяющихся чисел от 1 до 25, т.к. в данном случае массив с сервера содержит только 25 постов
const randomNumbers = generateArrayUniqueNumbers(1, 25);
const createRandomPosts = () => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length - 1; i++) {
    const posts = data.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

// «устранение дребезга»
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createRandomPosts, showAlert, isEscapeKey, debounce};
