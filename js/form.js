import {isEscapeKey} from './util.js';
import {pristine} from './form-validate.js';

// Форма
const imageUploadForm = document.querySelector('.img-upload__form');
// Поле для загрузки фотографий
const imageUploadInput = document.querySelector('.img-upload__input');
// Форма редактирования изображения
const formEditor = document.querySelector('.img-upload__overlay');
// Кнопка закрытия формы
const uploadCancelButton = document.querySelector('.img-upload__cancel');


// Открытие формы
const openForm = () => {
  // У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.
  formEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Закрытие формы по клику на крестик
  uploadCancelButton.addEventListener('click', onCloseButtonClick);
  // Закрытие формы по нажатию на Esc
  window.addEventListener('keydown', onDocumentKeydown);
};

// После выбора изображения (изменения значения поля .img-upload__input), показывается форма редактирования изображения.
// отменять этот обработчик не надо
imageUploadInput.addEventListener('change', () => {
  openForm();
});

// Закрытие формы
const closeForm = () => {
  formEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Удаляем ненужные обработчики
  uploadCancelButton.removeEventListener('click', onCloseButtonClick);
  window.removeEventListener('keydown', onDocumentKeydown);
  // сбрасываем значение формы
  imageUploadForm.reset();
  pristine.reset();
};

// Функция закрытия формы по клику на крестик
function onCloseButtonClick () {
  closeForm ();
}

// Функция закрытия формы по кнопке ESС
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

export {onDocumentKeydown};
