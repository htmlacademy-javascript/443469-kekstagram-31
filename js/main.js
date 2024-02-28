const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTION = [
  'Это рандомное описание фотографии',
  'Придумай сам',
  'Фото без описания',
  'Не хватает фантазии на описание'
];

const NAMES = [
  'Анна',
  'Татьяна',
  'Антон',
  'Дмитрий',
  'Виктория',
  'Юлия',
  'Агния',
  'Василий',
];

const photoId = {
  MIN: 1,
  MAX: 25
};

const urlId = {
  MIN: 1,
  MAX: 25
};

const likesCount = {
  MIN: 15,
  MAX: 200
};

const commentsCount = {
  MIN: 0,
  MAX: 30
};

const avatarId = {
  MIN: 1,
  MAX: 6
};

const NUMBER_OBJECTS = 25;


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateUniqueNumbersFromRange = (a, b) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(a, b);
    if (previousValues.length >= (b - a + 1)) {
      console.error('Перебраны все числа из диапазона от ' + a + ' до ' + b);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(a, b);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

// const getUniqueNumbersForComments = generateUniqueNumbersFromRange(1, 100);
const getUniqueNumbersForPhoto = generateUniqueNumbersFromRange(photoId.MIN, photoId.MAX);
const getUniqueNumbersForUrlPhoto = generateUniqueNumbersFromRange(urlId.MIN, urlId.MAX);
// console.log(getUniqueNumbersFromRange());

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createComment = () => ({
  // id: getUniqueNumbersForComments(), //TODO to fix it to be ANY number, not 1 - 100
  avatar: `img/avatar-${getRandomInteger(avatarId.MIN, avatarId.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES), //TODO need to be 1 or 2!!
  name: getRandomArrayElement(NAMES),
});

const createPublishedPhoto = () => ({
  id: getUniqueNumbersForPhoto(), // 0 - 25
  url: `photos/${getUniqueNumbersForUrlPhoto()}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(likesCount.MIN, likesCount.MAX),
  comments: Array.from({length: getRandomInteger(commentsCount.MIN, commentsCount.MAX)}, createComment)
});


const getPublishedPhotos = Array.from({length: NUMBER_OBJECTS}, createPublishedPhoto);

// console.log(createPublishedPhoto());
// console.log(getComments());
console.table(getPublishedPhotos);
