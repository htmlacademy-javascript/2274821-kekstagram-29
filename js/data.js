// Создает массив с данными о публикациях

import {getRandomInteger, getRandomArrayElement, createRandomIdFromRangeGenerator} from './util.js';
// description, строка — описание фотографии. Описание придумайте самостоятельно.
const DESCRIPTION = [
  'Люблю лето!',
  'С друзьями на природе',
  'Теплые воспоминания',
  'Немного наших будней вам в ленту',
  'Некоторые дни начинаются лучше остальных',
];

// Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
const NAME = [
  'Александр',
  'Маргарита',
  'Дарья',
  'Алена',
  'Никита',
  'Виктор',
];

const POST_COUNT = 25;
const generateIdComment = createRandomIdFromRangeGenerator(1, 10000);
const generateUrlPhoto = createRandomIdFromRangeGenerator(1, 25);
const generateIdPhoto = createRandomIdFromRangeGenerator(1, 25);

// Создание коментария:
// comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30.
// Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
// {
//   id: 135,
//   avatar: 'img/avatar-6.svg',
//   message: 'В целом всё неплохо. Но не всё.',
//   name: 'Артём',
// }
// У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
// Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
const createComment = () => ({
  idComment: generateIdComment(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGE),
  name: getRandomArrayElement(NAME),
});

// Создание описания фотографии:
// Идентификатор фотографии число от 1 до 25
// url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
// likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
const createPhotoDescription = () => ({
  id: generateIdPhoto(),
  url: `photos/${generateUrlPhoto()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length:getRandomInteger(0, 30)}, createComment),
});

// Создание массива из 25 постов:
const arrayOfPosts = Array.from({length: POST_COUNT}, createPhotoDescription);

export {arrayOfPosts};
