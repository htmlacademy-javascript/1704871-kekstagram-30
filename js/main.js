const POST_COUNT = 25;
const COMMENTS_COUNT = 30;
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const NAMES = [
  'Димочка',
  'Алексей Викторович',
  'Сергей',
  'Викуся',
  'Доримедонт',
  'Иван',
  'Доминик',
  'Аполлон',
];
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const DESCRIPTIONS = [
  'Эту фотографию я сделал сам! #me',
  'С друзьями на шашлыках #отдых',
  'Собрались со всей семьей дома #милыйдом #отдыхаем #уютный вечер',
  'Еду домой! #милыйдом #уютный вечер',
  'Это мы на отдыхе #отдыхаемхорошо #веселоидружно',
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createPhotoUrl = () => `photos/${getRandomInteger(1, 25)}.jpg`;

const createAvatarUrl = () => `img/avatar-${getRandomInteger(1, 25)}.svg`;

const getComment = () => ({
  id: getRandomInteger(1, 99999999),
  avatar: createAvatarUrl(),
  message: COMMENTS[getRandomInteger(0, COMMENTS.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)]
});

const getCommentsList = () => Array.from({length: getRandomInteger(0, COMMENTS_COUNT)}, getComment);

const getUserPost = () => ({
  id: getRandomInteger(1, 25),
  url: createPhotoUrl(),
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
  comments: getCommentsList()
});

const generateUsersDescriptions = () => Array.from({length: getRandomInteger(0, POST_COUNT)}, getUserPost);

generateUsersDescriptions();


