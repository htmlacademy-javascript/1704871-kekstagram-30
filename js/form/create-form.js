import {scalePicture, resetScale} from './scale-added-picture.js';
import {isEscape} from '../utils/utils.js';
import {initSlider, resetSlider} from './add-effects.js';
import {addValidators, pristineReset, pristineValidate} from './validate-form.js';
import {uploadFormData} from './submit-form.js';

const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const FILE_TYPES = ['.jpeg', '.jpg', '.svg', '.png'];

const form = document.querySelector('#upload-select-image');
const formUploadInput = document.querySelector('.img-upload__input');
const formEdit = document.querySelector('.img-upload__overlay');
const formCancelUploadButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const imgPreview = document.querySelectorAll('.effects__preview');

const setSubmitButtonState = (state) => {
  submitButton.disabled = state;
};

const onFormCancelUploadButtonClick = () => {
  closeModal();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt) && !document.querySelector('.error') && !document.querySelector('.success')) {
    closeModal();
  }
};

const resetUploadImage = () => {
  imgUploadPreview.src = DEFAULT_IMAGE;
  imgPreview.forEach((image) => {
    image.style.backgroundImage = `url('${DEFAULT_IMAGE}')`;
  });
};

function closeModal() {
  formEdit.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  pristineReset();
  resetScale();
  form.reset();
  resetSlider();
  resetUploadImage();
}

function openModal() {
  formEdit.classList.remove('hidden');
  document.body.classList.add('modal-open');
  formCancelUploadButton.addEventListener('click', onFormCancelUploadButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristineValidate();
  if (isValid) {
    setSubmitButtonState(true);
    const formData = new FormData(evt.target);
    uploadFormData(formData);
  }
};

const setUploadImage = () => {
  const file = formUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
    imgPreview.forEach((image) => {
      image.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    });
  }

  openModal();
};

const handleInputChange = () => setUploadImage();

const onUploadImage = () => {
  openModal();
};

const initForm = () => {
  formUploadInput.addEventListener('change', onUploadImage);
  form.addEventListener('submit', onFormSubmit);
  addValidators();
  scalePicture();
  initSlider();
  formUploadInput.addEventListener('change', handleInputChange);
};

export { initForm, closeModal, setSubmitButtonState };
