// Элемент, в который будет отрисовывать слайдер
const sliderElement = document.querySelector('.img-upload__effect-level');
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
  connect: 'lower',
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

// Для эффекта «Оригинал» CSS-стили filter удаляются, слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
const changeOriginalEffect = () => {
  imagePreview.style.filter = '';
  sliderElement.classList.add('hidden');
};

// Изменяем интенсивность применяемого фильтра в зависимости от передвижения слайдера
const changeValueEffect = (effect, unitMeasurement) => {
  sliderElement.noUiSlider.on('update', () => {
    // Связываем движение слайдера со значением effectLevelValue
    effectLevelValue.value = sliderElement.noUiSlider.get();
    // Подставляем данные
    imagePreview.style.filter = `${effect}(${effectLevelValue.value}${unitMeasurement})`;
  });
};

// Определяем какой элемент выбрали и применяем необходимый тип фильтра + значение
const onEffectListChange = (evt) => {
  const target = evt.target.id;
  sliderElement.classList.remove('hidden');
  if (target === 'effect-chrome') {
    // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
    changeSlider (0, 1, 0.1, 1);
    changeValueEffect('grayscale', '');
  } else if (target === 'effect-sepia') {
    // Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
    changeSlider (0, 1, 0.1, 1);
    changeValueEffect('sepia', '');
  } else if (target === 'effect-marvin') {
    // Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
    changeSlider (1, 100, 1, 100);
    changeValueEffect('invert', '%');
  } else if (target === 'effect-phobos') {
    // Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
    changeSlider (1, 3, 0.1, 3);
    changeValueEffect('blur', 'px');
  } else if (target === 'effect-heat') {
    // Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
    changeSlider (1, 3, 0.1, 3);
    changeValueEffect('brightness', '');
  } else if (target === 'effect-none') {
    changeOriginalEffect();
  }
};

export {changeOriginalEffect, onEffectListChange};

