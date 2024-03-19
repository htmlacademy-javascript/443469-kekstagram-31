const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateUniqueNumbersFromRange = (a, b) => {
  const previousValues = [];
  return () => {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      // console.error(`Перебраны все числа из диапазона от ${a} до ${b}`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, generateUniqueNumbersFromRange, isEscapeKey};
