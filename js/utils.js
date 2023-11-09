import {
  POST_COUNT,
  COMMENTS_MIN_COUNT,
  COMMENTS_MAX_COUNT,
  AVATAR_MIN_COUNT,
  AVATAR_MAX_COUNT,
  LIKES_MIN_COUNT,
  LIKES_MAX_COUNT,
  NAMES,
  MESSAGES,
  DESCRIPTIONS
} from './data.js';

let postId = 1;
let commentId = 1;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createMessage = () => {
  const message = Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES));
  return Array.from(new Set(message)).join(' ');
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(AVATAR_MIN_COUNT, AVATAR_MAX_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPost = () => ({
  id: postId,
  url: `photos/${postId++}.jpg`,
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  description: getRandomArrayElement(DESCRIPTIONS),
  comments: Array.from({length: getRandomInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT)}, createComment)
});

const createPosts = () => Array.from({length: POST_COUNT}, createPost);
// const createPosts = () => {

//   Array.from({length: POST_COUNT}, createPost);
// };

export {createPosts};
