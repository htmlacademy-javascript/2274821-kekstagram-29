// Показывает сообщения после отправки формы
import { isEscapeKey } from './util.js';
import { pristine, imageUploadForm } from './form-validate.js';
import { sendData } from './api.js';
import { closeForm } from './form.js';

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const uploadButton = document.querySelector('.img-upload__submit');

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

// Показываем окно с успешной отправкой формы
const showSuccessMessage = () => showMessage(successMessage, ButtonClass.SUCCESS);

// Показываем окно с ошибкой отправки формы
const showErrorMessage = () => showMessage(errorMessage, ButtonClass.ERROR);

// Блокировка кнопки отправки формы
const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Отправляю...';
};

// Отмена блокировки кнопки отправки формы
const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

// Отправка данных формы на сервер (+ скрытие формы и показ сообщения об успешной отправке)
const sendDataSuccess = async (data) => {
  try {
    await sendData(data);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

// Отправка формы или показ ошибки (проверка валидации, показ соответствующего окна, сбор информации с формы в formData)
imageUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockUploadButton();
    const formData = new FormData(evt.target);
    await sendDataSuccess(formData);
    unblockUploadButton();
  }
});

