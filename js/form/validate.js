

const form = document.querySelector('#upload-select-image');
const formUploadInput = document.querySelector('.img-upload__input');
const formEdit = document.querySelector('.img-upload__overlay');
const formCancelUploadButton = document.querySelector('.img-upload__cancel');
const postHashtags = document.querySelector('.text__hashtags');
const postDesctiptions = document.querySelector('.text__description');
const hashTagRegEx = /^#[a-zа-я0-9]{1,19}$/i;
const HASHTAGS_MAX_COUNT = 5;

let allHashtags = [];
let errorMessage = '';
let commentString = '';

let pristine = {};

form.setAttribute('method', 'post');
form.setAttribute('enctype', 'multipart/form-data');
form.setAttribute('action', 'https://30.javascript.pages.academy/kekstagram');

const isValidHashTag = (hashtag) => hashTagRegEx.test(hashtag);
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
  console.log(allHashtags);
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
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate() === true) {
    form.submit();
  } else {
    pristine.validate();
  }
};

const onUploadCancelClick = () => {
  hideModal();
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    hideModal();
  }
};
const removeEscapeListener = () => {
  document.removeEventListener('keydown', onDocumentKeydown);
};
const addEscapeListener = () => {
  document.addEventListener('keydown', onDocumentKeydown);
};

function hideModal() {
  formEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // document.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  form.reset();
}

const createPristineObj = () => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper--error'
  }, false);
};
const createPristineValidators = () => {
  pristine.addValidator(postHashtags, validateHashTags, getHashTagErrorMessage);
  pristine.addValidator(postDesctiptions, validateComment, getCommentErrorMessage);
};

function openModal() {
  formEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCancelUploadButton.addEventListener('click', onUploadCancelClick);
  // document.addEventListener('keydown', onDocumentKeydown);

  createPristineObj();
  createPristineValidators();
  postHashtags.addEventListener('focusin', removeEscapeListener);
  postHashtags.addEventListener('focusout', addEscapeListener);
  postDesctiptions.addEventListener('focusin', removeEscapeListener);
  postDesctiptions.addEventListener('focusout', addEscapeListener);

  form.addEventListener('submit', onFormSubmit);
}
const onUploadImage = () => {
  openModal();
};


const validateForm = () => {
  formUploadInput.addEventListener('change', onUploadImage);
};

export { validateForm };
