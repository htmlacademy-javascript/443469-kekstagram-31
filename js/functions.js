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

/**
 * function to check if a meeting fits a working day duration
 * @param startTime{string} - it's a start time of a working day
 * @param endTime{string} - it's an end time of a working day
 * @param startMeeting{string} - it's a start time of a meeting
 * @param duration{number} - it's a duration of a meeting
 * @return {boolean} - true, if a meeting fits a working day, false - opposite
 */

function checkMeetingFitsDay(startTime, endTime, startMeeting, duration) {
  const TimeValue = {
    MIN_IN_HOUR: 60,
    TOTAL_HOUR: 24
  };

  const totalDurationDay = TimeValue.TOTAL_HOUR * TimeValue.MIN_IN_HOUR;

  const valueInMinutes = (value) => {
    const splittedVal = value.split(':');
    return parseInt(splittedVal[0], 10) * TimeValue.MIN_IN_HOUR + parseInt(splittedVal[1], 10);
  };

  const durationStartDayMinutes = valueInMinutes(startTime);
  const durationEndDayMinutes = valueInMinutes(endTime);
  const meetingDayMinutes = valueInMinutes(startMeeting);

  const workingDayDurationMinutes = durationEndDayMinutes - durationStartDayMinutes;
  const leftWorkingDay = durationEndDayMinutes - meetingDayMinutes;
  const isWithinDayLimit = totalDurationDay < durationStartDayMinutes || totalDurationDay < durationEndDayMinutes || totalDurationDay < duration;

  if (isWithinDayLimit) {
    // console.log('Рабочий день или встреча не укладываются в одни календарные сутки.');
    return false;
  }

  //если митинг ДО старта рабочего времени
  //если общее время работы < длительности митинга, независимо от его старта
  //если время митинга >, чем время от начала митинга до конца рабочего дня
  if (durationStartDayMinutes > meetingDayMinutes || leftWorkingDay < duration || (durationEndDayMinutes < meetingDayMinutes - duration)) {
    return false;
  }

  return workingDayDurationMinutes >= duration;
}

checkMeetingFitsDay('08:00', '17:30', '14:00', 90);

// console.log(checkMeetingFitsDay('08:00', '17:30', '14:00', 90)); // true
// console.log(checkMeetingFitsDay('8:0', '10:0', '8:0', 120));// true
// console.log(checkMeetingFitsDay('08:00', '14:30', '14:00', 90));// false
// console.log(checkMeetingFitsDay('14:00', '17:30', '08:0', 90));// false
// console.log(checkMeetingFitsDay('8:00', '17:30', '08:00', 900));// false
