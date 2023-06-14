// Функция для проверки длины строки
const checkLengthString = function (string, maxLength) {
  return string.length <= maxLength;
};

checkLengthString ('проверяемая строка', 20);
checkLengthString ('проверяемая строка', 18);
checkLengthString ('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом
const checkPalindrome = function (string) {
  const normalizeString = string.replaceAll(' ', '').toUpperCase();
  let invertedString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString.at(i);
  }
  return invertedString === normalizeString;
};

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл');
