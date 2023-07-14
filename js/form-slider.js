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
const changeSlider = (opts) => {
  const {min, max, step, start} = opts;
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

// Объект с фильтрами
const PARAMETRS_EFFECTS = {
  'effect-chrome': {
    opts: {
      // Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'grayscale',
    unitMeasurement: '',
  },
  'effect-sepia': {
    opts: {
    // Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'sepia',
    unitMeasurement: '',
  },
  'effect-marvin': {
    // Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
    opts: {
      min: 0,
      max: 100,
      step: 1,
      start: 100,
    },
    effectName: 'invert',
    unitMeasurement: '%',
  },
  'effect-phobos': {
    //Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
    opts: {
      min: 0,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'blur',
    unitMeasurement: 'px',
  },
  'effect-heat': {
    // Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
    opts: {
      min: 1,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'brightness',
    unitMeasurement: '',
  }
};

// Изменяем интенсивность применяемого фильтра в зависимости от передвижения слайдера
const changeValueEffect = (effectName, unitMeasurement) => {
  sliderElement.noUiSlider.off();
  sliderElement.noUiSlider.on('update', () => {
    // Связываем движение слайдера со значением effectLevelValue
    effectLevelValue.value = sliderElement.noUiSlider.get();
    // Подставляем данные
    imagePreview.style.filter = `${effectName}(${effectLevelValue.value}${unitMeasurement})`;
  });
};

// Определяем какой элемент выбрали и применяем необходимый тип фильтра + значение
const onEffectListChange = (evt) => {
  const effect = evt.target.id;
  if (effect === 'effect-none') {
    changeOriginalEffect();
    return;
  }
  sliderElement.classList.remove('hidden');
  const opts = PARAMETRS_EFFECTS[effect].opts;
  const effectName = PARAMETRS_EFFECTS[effect].effectName;
  const unitMeasurement = PARAMETRS_EFFECTS[effect].unitMeasurement;
  changeSlider(opts);
  changeValueEffect(effectName, unitMeasurement);
};

export {changeOriginalEffect, onEffectListChange};

