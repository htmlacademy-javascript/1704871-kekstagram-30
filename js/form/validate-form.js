

const REG_EX = /^#[a-zа-я0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;

const form = document.querySelector('#upload-select-image');

const postHashtags = document.querySelector('.text__hashtags');
const postDescriptions = document.querySelector('.text__description');

let allHashtags = [];
let errorMessage = '';
let commentString = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);

const isValidHashTag = (hashtag) => REG_EX.test(hashtag);
const checkDuplicates = (data) => {
  const uniqueHashtags = new Set(data);
  return !(data.length === uniqueHashtags.size);
};
const isValidHashTags = () => {
  const validHashtags = allHashtags.map((hashtag) => isValidHashTag(hashtag));
  return !validHashtags.includes(false);
};
const checkHashTagsCount = (data) => data.length > HASHTAGS_MAX_COUNT;
const validateHashTags = (hashtags) => {
  if (!hashtags) {
    return true;
  }
  allHashtags = Array.from(hashtags.trim().split(' '));
  if (checkHashTagsCount(allHashtags)) {
    errorMessage = 'превышено количество хэш-тегов';
    return false;
  }
  if (checkDuplicates(allHashtags)) {
    errorMessage = 'хэш-теги повторяются';
    return false;
  }
  if (isValidHashTags) {
    errorMessage = 'введён невалидный хэш-тег';
    return false;
  }
  return true;
};

const checkCommentLength = (comment) => {
  if (comment.length > 140) {
    commentString = 'длина комментария больше 140 символов';
    return false;
  }
  return true;
};

const validateComment = (comment) => checkCommentLength(comment);
const getHashTagErrorMessage = () => errorMessage;
const getCommentErrorMessage = () => commentString;


const pristineReset = () => pristine.reset();
const pristineValidate = () => pristine.validate();

const addValidators = () => {
  pristine.addValidator(postHashtags, validateHashTags, getHashTagErrorMessage);
  pristine.addValidator(postDescriptions, validateComment, getCommentErrorMessage);
};

export {addValidators, pristineReset, pristineValidate};
