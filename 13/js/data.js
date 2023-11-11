import {getRandomInteger, getRandomArrayElement} from './utils.js';

const POST_COUNT = 25;
const COMMENTS_MIN_COUNT = 0;
const COMMENTS_MAX_COUNT = 30;
const AVATAR_MIN_COUNT = 1;
const AVATAR_MAX_COUNT = 6;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const NAMES = ['Димочка', 'Алексей Викторович', 'Сергей', 'Викуся', 'Доримедонт', 'Иван', 'Доминик', 'Аполлон'];
const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const DESCRIPTIONS = ['Эту фотографию я сделал сам! #me', 'С друзьями на шашлыках #отдых', 'Собрались со всей семьей дома #милыйдом #отдыхаем #уютный вечер', 'Еду домой! #милыйдом #уютный вечер', 'Это мы на отдыхе #отдыхаемхорошо #веселоидружно'];
let postId = 1;
let commentId = 1;

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

export {createPosts};
