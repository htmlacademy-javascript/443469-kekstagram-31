import {generateUniqueNumbersFromRange, getRandomInteger} from './util.js';
import {
  AvatarId,
  CommentsCount,
  DESCRIPTION,
  GeneralId,
  LikesCount,
  MESSAGES,
  NAMES,
} from './consts.js';

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

export {generatePublishedPhotos};
