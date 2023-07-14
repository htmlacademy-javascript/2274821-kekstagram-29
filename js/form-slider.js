// Элемент, в который будет отрисовывать слайдер
const sliderElement = document.querySelector('.img-upload__effect-level');
// Список всех фильтров
const effecstList = document.querySelector('.effects__list');
//  Уровень эффекта записывается в поле .effect-level__value
const effectLevelValue = document.querySelector('.effect-level__value');
// При изменении уровня интенсивности эффекта, CSS-стили картинки внутри .img-upload__preview обновляются
const imagePreview = document.querySelector('.img-upload__preview');

// Создаем слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
});

// Изменяем параметры слайдера
const changeSlider = (min, max, step, start) => {
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });
};

// Изменяем значение/уровень эффекта в поле .effect-level__value
const onSliderUpdate = () => {
  effectLevelValue.value = sliderElement.noUiSlider.get();
};

// Подписываемся на событие 'update' у слайдера, чтобы при изменении положения слайдера, изменять значение/уровень эффекта в поле .effect-level__value
sliderElement.noUiSlider.on('update', onSliderUpdate);

// Для эффекта «Оригинал» CSS-стили filter удаляются, слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
const changeOriginalEffect = () => {
  imagePreview.style.filter = '';
  sliderElement.classList.add('hidden');
};

// Определяем на какой эффект кликнули (находится в фокусе)
effecstList.addEventListener('click', (evt) => {
  const target = evt.target.id;
  sliderElement.classList.remove('hidden');
  if (target === 'effect-chrome') {
    // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
    imagePreview.style.filter = `grayscale(${effectLevelValue.value})`;
  } else if (target === 'effect-sepia') {
    // Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
    imagePreview.style.filter = `sepia(${effectLevelValue.value})`;
  } else if (target === 'effect-marvin') {
    // Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
    changeSlider (1, 100, 1, 100);
    imagePreview.style.filter = `invert(${effectLevelValue.value}%)`;
  } else if (target === 'effect-phobos') {
    // Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
    changeSlider (1, 3, 0.1, 3);
    imagePreview.style.filter = `blur(${effectLevelValue.value}px)`;
  } else if (target === 'effect-heat') {
    // Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
    imagePreview.style.filter = `brightness(${effectLevelValue.value})`;
  } else if (target === 'effect-none') {
    changeOriginalEffect();
  }
});

export {changeOriginalEffect};

