// Функция для проверки длины строки
let checkLengthString = function (string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

console.log (checkLengthString ('проверяемая строка', 20));
console.log (checkLengthString ('проверяемая строка', 18));
console.log (checkLengthString ('проверяемая строка', 10));

// Функция для проверки, является ли строка палиндромом
let checkPalindrome = function (string) {
  let withoutSpaces = string.replaceAll(' ', '');
  let normalizeString = withoutSpaces.toUpperCase();
  let invertedString = '';
  for (let i = normalizeString.length - 1; i >= 0; i--) {
    invertedString += normalizeString.at(i);
  };
  if (invertedString === normalizeString) {
    return true;
  };
  return false;
}

console.log(checkPalindrome('топот'));
console.log(checkPalindrome('ДовОд'));
console.log(checkPalindrome('Кекс'));
console.log(checkPalindrome('Лёша на полке клопа нашёл'));
