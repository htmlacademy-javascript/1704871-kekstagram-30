import {scalePicture} from './effects.js';
import {isEscape} from '../utils/utils.js';
import {addValidators, pristineReset, pristineValidate} from './validate.js';

const form = document.querySelector('#upload-select-image');
const formUploadInput = document.querySelector('.img-upload__input');
const formEdit = document.querySelector('.img-upload__overlay');
const formCancelUploadButton = document.querySelector('.img-upload__cancel');

const onUploadCancelClick = () => {
  hideModal();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    hideModal();
  }
};

function hideModal() {
  formEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristineReset();
  form.reset();
}

function openModal() {
  formEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCancelUploadButton.addEventListener('click', onUploadCancelClick);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristineValidate();
};

const onUploadImage = () => {
  openModal();
};


const initForm = () => {
  formUploadInput.addEventListener('change', onUploadImage);
  form.addEventListener('submit', onFormSubmit);
  addValidators();
  scalePicture();
};

export { initForm };
