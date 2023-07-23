// Создает миниатюры изображений на основе массива, полученного с сервера

// Ищем в разметке куда будем вставлять сгенерированные фотографии
const allPostsList = document.querySelector('.pictures');
//Ищем шаблон в разметке
const postTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Склонируем шаблон и вставим в нужное место на странице, добавим данные, полученные с сервера
const createMiniaturePosts = (posts) => {
  // Удаляем загруженные ранее посты
  const unnecessaryPosts = allPostsList.querySelectorAll('.picture');
  unnecessaryPosts.forEach((element) => element.remove());
  // Cоздаем "коробочку"
  const allPosts = document.createDocumentFragment();
  posts.forEach(({id, url, description, likes, comments}) => {
    // Клонируем шаблон
    const postElement = postTemplate.cloneNode(true);
    // Добавляем id
    postElement.dataset.id = id;
    // Адрес изображения url подставьте как атрибут src изображения
    postElement.querySelector('.picture__img').src = url;
    // Описание изображения description подставьте в атрибут alt изображения.
    postElement.querySelector('.picture__img').alt = description;
    // Количество лайков likes выведите в блок .picture__likes.
    postElement.querySelector('.picture__likes').textContent = likes;
    // Количество комментариев comments выведите в блок .picture__comments.
    postElement.querySelector('.picture__comments').textContent = comments.length;
    // Складываем все элементы в "коробочку"
    allPosts.append(postElement);
  });
  // Складываем в определенное место в разметке "коробочки" с разными постами
  allPostsList.append(allPosts);
};

export {createMiniaturePosts};


