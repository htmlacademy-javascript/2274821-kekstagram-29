const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

import {onDocumentKeydown} from './form.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadText = document.querySelector('.img-upload__text');
const formHashtag = imageUploadText.querySelector('.text__hashtags');
const formDescription = imageUploadText.querySelector ('.text__description');

const pristine = new Pristine(imageUploadForm, {
  // Элемент, на который будут добавляться классы
  classTo: 'img-upload__field-wrapper',
  // Элемент, куда будет выводиться текст с ошибкой
  errorTextParent: 'img-upload__field-wrapper',
});

const normilize = (value) => {
  // Убираем лишние пробелы по краям массива с комметами, разделяем хэштеги пробелами и передаем в новый массив те элементы, которые не пустые
  const noNormilizeArray = value.trim().split(' ');
  const normilizeArray = noNormilizeArray.filter((tag) => tag.length > 0);
  return normilizeArray;
};

// Для разных ошибок показываются разные сообщения. Следует разделять случаи, когда:
// 1. введён невалидный хэш-тег;
const isValidateTextHashtag = (textHashtag) => normilize(textHashtag).every((tag) => VALID_SYMBOLS.test(tag));

pristine.addValidator(
  formHashtag,
  isValidateTextHashtag,
  'Хэштег должен начинаться с #, состоять из букв и чисел и содержать 20 символов, включая #'
);

// 2. превышено количество хэш-тегов;
const isValidCountHashtag = (textHashtag) => normilize(textHashtag).length <= MAX_HASHTAG_COUNT;

pristine.addValidator(
  formHashtag,
  isValidCountHashtag,
  'Максимальное количество хэштегов - 5'
);

// 3. хэш-теги повторяются.
const isUniqueHashtag = (textHashtag) => {
  // т.к. хэштеги не чувствительны к регистру, приведем все к строчным буквам
  const lowerCase = normilize(textHashtag).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

pristine.addValidator(
  formHashtag,
  isUniqueHashtag,
  'Хэштеги должны быть уникальными'
);

/* Если фокус находится в поле ввода хэштега или комментария, нажатие на Esc не должно приводить к закрытию формы
редактирования изображения*/
const calcelEsc = (item) => {
  item.addEventListener('focus', () => {
    window.removeEventListener('keydown', onDocumentKeydown);
  });
  item.addEventListener('blur', () => {
    window.addEventListener('keydown', onDocumentKeydown);
  });
};
calcelEsc(formHashtag);
calcelEsc(formDescription);

export {imageUploadForm, pristine};

