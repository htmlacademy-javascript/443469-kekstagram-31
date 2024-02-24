/**
 * function for check string length
 * @param {string} string - it's a string to check
 * @param {number} maxLength - max number of characteristics in string
 * @return {boolean} - returns true result if string>= max string length
 */
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

/**
 * function check if a string is a palindrome
 * @param {string} string - it's a string to check
 * @return {boolean} - true if a string is a palindrome
 */
function checkIsPalindrome(string) {
  const adjustedInitialString = string.replaceAll(/\s/g, '').toLowerCase();
  let newString = '';
  for (let i = adjustedInitialString.length - 1; i >= 0; i--) {
    newString += adjustedInitialString.at(i);
  }
  return adjustedInitialString === newString;
}

checkIsPalindrome('топот'); // true
checkIsPalindrome('ДовОд'); // true
checkIsPalindrome('Кекс'); // false
checkIsPalindrome('Лёша на полке клопа нашёл '); // false

/**
 * function to check if a string consists of numbers
 * @param {any} initialValue - it's a string or number to check
 * @return {number} number - function returns a number from a string
 */
function checkIsNumbersInString(initialValue) {
  const adjustedInitialValue = initialValue.toString().replaceAll(/\s/g, '');
  let resultValue = '';

  for (let i = 0; i < adjustedInitialValue.length; i++) {
    if (!Number.isNaN(parseInt(adjustedInitialValue[i], 10))) {
      resultValue += adjustedInitialValue[i];
    }
  }
  return parseInt(resultValue, 10);
}

checkIsNumbersInString('2023 год'); // 2023
checkIsNumbersInString('ECMAScript 2022'); // 2022
checkIsNumbersInString('1 кефир, 0.5 батона'); // 105
checkIsNumbersInString('агент 007'); // 7
checkIsNumbersInString('а я томат'); // NaN
checkIsNumbersInString(2023); // 2023
checkIsNumbersInString(-1); // 1
checkIsNumbersInString(1.5); // 15
