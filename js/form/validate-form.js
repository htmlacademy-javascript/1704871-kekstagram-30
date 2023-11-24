const HASHTAG_REGEX = /^#[a-zа-я0-9]{1,19}$/;
const HASHTAG_COUNT = 5;
const COMMENT_LENGTH = 140;

const NOT_VALID_HASHTAG = 'Правила написания хештегов: 1) Длина не более 20 символов 2) Разрешены только буквы и цифры 3) Первый символ хештега - #';
const DUPLICATED_HASHTAG = 'Один и тот же хэштег не может быть использован дважды';
const INVALID_HASHTAG_COUNT = 'Нельзя указать более пяти хэштегов';
const INVALID_COMMENT_LENGTH = 'Длина комментария не может быть больше 140 символов';

const uploadForm = document.querySelector('.img-upload__form');
const textHashTags = document.querySelector('.text__hashtags');
const textComments = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const createHashTags = (hashtagsString) => hashtagsString.trim().toLowerCase().split(' ').filter((hashtag) => hashtag);

const isValidHashTags = (hashtagsString) => createHashTags(hashtagsString).every((hashtag) => HASHTAG_REGEX.test(hashtag));

const isUniqueHashTags = (hashtagsString) => {
  const hashtags = createHashTags(hashtagsString);
  return hashtags.length === new Set(hashtags).size;
};

const isValidCount = (hashtagsString) => createHashTags(hashtagsString).length <= HASHTAG_COUNT;

const isCorrectLength = (commentString) => commentString.length <= COMMENT_LENGTH;

const addValidators = () => {
  pristine.addValidator(textHashTags, isValidHashTags, NOT_VALID_HASHTAG, 1, true);
  pristine.addValidator(textHashTags, isUniqueHashTags, DUPLICATED_HASHTAG, 1, true);
  pristine.addValidator(textHashTags, isValidCount, INVALID_HASHTAG_COUNT, 1, true);
  pristine.addValidator(textComments, isCorrectLength, INVALID_COMMENT_LENGTH, 1, true);
};

const pristineReset = () => pristine.reset();

const pristineValidate = () => pristine.validate();

export {addValidators, pristineReset, pristineValidate};
