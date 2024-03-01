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

const NUMBER_OBJECTS = 25;

const GeneralId = {
  MIN: 1,
  MAX: 25
};

const LikesCount = {
  MIN: 15,
  MAX: 200
};

const CommentsCount = {
  MIN: 0,
  MAX: 30
};

const AvatarId = {
  MIN: 1,
  MAX: 6
};

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

const getUniqueNumbersForPhoto = generateUniqueNumbersFromRange(GeneralId.MIN, GeneralId.MAX);
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

let idComment = 1;

const createComment = () => ({
  id: idComment++,
  avatar: `img/avatar-${getRandomInteger(AvatarId.MIN, AvatarId.MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPublishedPhoto = () => {
  const id = getUniqueNumbersForPhoto();
  const url = `photos/${id}.jpg`;

  return {
    id: id,
    url: url,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(LikesCount.MIN, LikesCount.MAX),
    comments: Array.from({length: getRandomInteger(CommentsCount.MIN, CommentsCount.MAX)}, createComment)
  };
};

const generatePublishedPhotos = (numberOfPhotos) => Array.from({length: numberOfPhotos}, createPublishedPhoto);
const getPublishedPhotos = generatePublishedPhotos(NUMBER_OBJECTS);

console.table(getPublishedPhotos);
