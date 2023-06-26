const isWorkingDay = (startWork, endWork, startMeeting, durationMeeting) => {
  // Разделяем часы и минуты и переведем в массив
  const timeStartWork = startWork.split(':');
  const timeEndWork = endWork.split(':');
  const timeStartMeeting = startMeeting.split(':');
  // Считаем сколько минут осталось с начала встречи до конца рабочего дня (если встреча началась в течение рабочего дня)
  const minutesEndWork = (Number(timeEndWork[0]) * 60 + Number(timeEndWork[1])) - (Number(timeStartMeeting[0]) * 60 + Number(timeStartMeeting[1]));
  // Считаем сколько минут от начала рабочего дня до встречи (если встреча началась до начала рабочего дня)
  const minutesStartWork = (Number(timeStartMeeting[0]) * 60 + Number(timeStartMeeting[1])) - (Number(timeStartWork[0] * 60) + Number(timeStartWork[1]));
  // Проверяем выходит ли встреча за рамки рабочего дня
  // Если количество минут до конца рабочего дня >= количеству минут встречи или количество минут от начала рабочего дня до начала встречи >=0
  // то встрче началась в рабочий день => true
  if (minutesEndWork >= durationMeeting && minutesStartWork >= 0) {
    return true;
  }
  return false;
};
isWorkingDay('7:00', '18:00', '17:15', 46);
// Проверка
// console.log(isWorkingDay('7:00', '18:00', '17:15', 45));


// // Функция для проверки длины строки
// const checkLengthString = function (string, maxLength) {
//   return string.length <= maxLength;
// };

// checkLengthString ('проверяемая строка', 20);
// checkLengthString ('проверяемая строка', 18);
// checkLengthString ('проверяемая строка', 10);

// // Функция для проверки, является ли строка палиндромом
// const checkPalindrome = function (string) {
//   const normalizeString = string.replaceAll(' ', '').toUpperCase();
//   let invertedString = '';
//   for (let i = normalizeString.length - 1; i >= 0; i--) {
//     invertedString += normalizeString.at(i);
//   }
//   return invertedString === normalizeString;
// };

// checkPalindrome('топот');
// checkPalindrome('ДовОд');
// checkPalindrome('Кекс');
// checkPalindrome('Лёша на полке клопа нашёл');
