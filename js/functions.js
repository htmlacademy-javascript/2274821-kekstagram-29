// Функция для проверки длины строки
const checkLengthString = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

checkLengthString ('проверяемая строка', 20);
checkLengthString ('проверяемая строка', 18);
checkLengthString ('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом
const checkPalindrome = function (string) {
  const withoutSpaces = string.replaceAll(' ', '');
  const normalizeString = withoutSpaces.toUpperCase();
  let invertedString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString.at(i);
  }
  if (invertedString === normalizeString) {
    return true;
  }
  return false;
};

checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл');
