const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadText = document.querySelector('.img-upload__text');
const formHashtag = imageUploadText.querySelector('.text__hashtags');
const formDescription = imageUploadText.querySelector ('.text__description');

const pristine = new Pristine(imageUploadForm, {
  // Элемент, на который будут добавляться классы
  classTo: 'text__hashtags',
  // Класс, обозначающий невалидное поле
  errorText: 'img-upload__field-wrapper',
});

// условия валидации хештега
const validateHashtag = (value) => {
  const hashtagValidate = /^#[a-zа-я0-9]{1,19}$/i;
  return hashtagValidate.test(value);
};

// условия валидации описания фото
const validateDescription = (value) => value.length <= 140;


// первый аргумент - элемент формы, который мы хотим валидировать.
// второй аргумент - функция проверки
// третий аргумент - сообщение об ошибке
pristine.addValidator(formHashtag, validateHashtag,'Хештег должен состоять из латинских или русских букв и цифр, начинаться с #, максимальная длина 20 символов');
pristine.addValidator(formDescription, validateDescription, 'Максимальная длина описания 140 символов');

// Проверка валидации при отправке формы
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {imageUploadForm};
