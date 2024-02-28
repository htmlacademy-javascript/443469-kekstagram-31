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


const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getComments = () => {
  return {
    id: getRandomInteger(0, 100), //need to fix it to be ANY number
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES), //need to be 1 or 2!!
    name: getRandomArrayElement(NAMES),
  };
};

const createPublishedPhoto = () => {
  return {
    id: getRandomInteger(0, 25),
    url: `photos/${getRandomInteger(0, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    likes: getRandomInteger(15, 2000),
    // comments: `${getComments()}`,
    comments: getComments(),
  };
};


const getPublishedPhotos = Array.from({length: NUMBER_OBJECTS}, createPublishedPhoto);

console.log(createPublishedPhoto());
console.log(getComments());
console.table(getPublishedPhotos);
