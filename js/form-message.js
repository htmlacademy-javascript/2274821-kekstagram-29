// Показывает сообщения после отправки формы
import { isEscapeKey } from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const ButtonClass = {
  ERROR: '.error__button',
  SUCCESS: '.success__button',
};

// Закрытие при нажатии на кнопку
const closeMessage = () => {
  const messageElement = successMessage || errorMessage;
  messageElement.remove();
  // Удаляем ненужные обработчики
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onBodyClick);
};

// Показываем сообщение после отправки формы
const showMessage = (messageElement, closeButtonClass) => {
  // Разметку сообщения, которая находится в блоке #success внутри шаблона template, нужно разместить перед закрывающим тегом </body>
  document.body.append(messageElement);
  // Сообщение должно исчезать после нажатия на кнопку .success__button
  messageElement.querySelector(closeButtonClass).addEventListener('click', closeMessage);
  // Сообщение должно исчезать по нажатию на клавишу Esc
  document.addEventListener('keydown', onDocumentKeydown);
  // Сообщение должно исчезать по клику на произвольную область экрана за пределами блока с сообщением
  document.addEventListener('click', onBodyClick);
};

// Функция закрытия сообщения формы по кнопке ESС
function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

// Определяем был ли клик за пределами блока с сообщением
function onBodyClick (evt) {
  if (evt.target.closest('.error__button') || evt.target.closest('.success__button')) {
    return;
  }
  closeMessage();
}

// Показыаем окно с успешной отправкой формы
const showSuccessMessage = () => showMessage(successMessage, ButtonClass.SUCCESS);

// Показыаем окно с ошибкой отправки формы
const showErrorMessage = () => showMessage(errorMessage, ButtonClass.ERROR);

export {showSuccessMessage, showErrorMessage};
