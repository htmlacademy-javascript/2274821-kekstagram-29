import {isEscapeKey} from './util.js';
import {pristine} from './form-validate.js';
import {changeOriginalEffect, onEffectListChange} from './form-slider.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
// Форма
const imageUploadForm = document.querySelector('.img-upload__form');
// Поле для загрузки фотографий
const imageUploadInput = document.querySelector('.img-upload__input');
// Форма редактирования изображения
const formEditor = document.querySelector('.img-upload__overlay');
// Кнопка закрытия формы
const uploadCancelButton = document.querySelector('.img-upload__cancel');
// Список всех фильтров
const effecstList = document.querySelector('.effects__list');

// <Масштаб изображения>
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const scaleImage = document.querySelector('.img-upload__preview');
let scaleNumber;

// <Масштаб изображения>
// Получаем число из строки
const getScaleNumber = (scaleString) => parseInt(scaleString.value, 10);

// Уменьшение изображения
const onMinButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber > SCALE_MIN) {
    scaleValue.value = `${scaleNumber - SCALE_STEP}%`;
    scaleImage.style.transform = `scale(${(scaleNumber - SCALE_STEP) / 100})`;
  }
};

// Увеличение изображения
const onMaxButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber < SCALE_MAX) {
    scaleValue.value = `${scaleNumber + SCALE_STEP}%`;
    scaleImage.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};

// <Открытие формы>
const openForm = () => {
  // У элемента .img-upload__overlay удаляется класс hidden, а body задаётся класс modal-open.
  formEditor.classList.remove('hidden');
  document.body.classList.add('modal-open');
  // Закрытие формы по клику на крестик
  uploadCancelButton.addEventListener('click', onCloseButtonClick);
  // Закрытие формы по нажатию на Esc
  window.addEventListener('keydown', onDocumentKeydown);
  // Изменяем значение scaleValue.value(строка с масштабом в %)
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
  // При открытии формы не должно быть видно слайдера эффектов и показан оригинал фотографии(буз применения эффектов)
  changeOriginalEffect();
  // Изменяем тип и интенсивность фильтра
  effecstList.addEventListener('change', onEffectListChange);
};

// После выбора изображения (изменения значения поля .img-upload__input), показывается форма редактирования изображения.
// отменять этот обработчик не надо
imageUploadInput.addEventListener('change', () => {
  openForm();
});

// <Закрытие формы>
const closeForm = () => {
  formEditor.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // Удаляем ненужные обработчики
  uploadCancelButton.removeEventListener('click', onCloseButtonClick);
  window.removeEventListener('keydown', onDocumentKeydown);
  scaleSmaller.removeEventListener('click', onMinButtonClick);
  scaleBigger.removeEventListener('click', onMaxButtonClick);
  effecstList.removeEventListener('change', onEffectListChange);
  // сбрасываем значение формы
  imageUploadForm.reset();
  pristine.reset();
  scaleImage.style.transform = '';
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
