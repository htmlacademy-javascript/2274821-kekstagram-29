const ALERT_SHOW_TIME = 5000;
const FILTER_SHOW_PHOTO = 10;

// Показываем ошибку
const showAlert = (message) => {
  const notice = document.createElement('div');
  notice.style.position = 'absolute';
  notice.style.zIndex = '100';
  notice.style.top = '0';
  notice.style.padding = '10px 3px';
  notice.style.fontSize = '20px';
  notice.style.textAlign = 'center';
  notice.style.background = 'red';
  notice.textContent = message;
  document.body.append(notice);

  setTimeout (() => {
    notice.remove();
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

// Генерируем 10 неповторяющихся чисел от 0 до 24, т.к. в данном случае массив с сервера содержит только 25 постов
const randomNumbers = generateArrayUniqueNumbers(0, 24);
const createRandomPosts = (array) => {
  const randomPosts = [];
  for (let i = 0; i < randomNumbers.length; i++) {
    const posts = array.find((post) => randomNumbers[i] === post.id);
    randomPosts.push(posts);
  }
  return randomPosts;
};

// «устранение дребезга»
function debounce (callback, timeoutDelay) {
  let isCooldown = false;
  return function() {
    if (isCooldown) {
      return;
    }
    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, timeoutDelay);
  };
}

export {createRandomPosts, showAlert, isEscapeKey, debounce};
