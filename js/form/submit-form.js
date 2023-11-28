import { closeModal, setSubmitButtonState } from './create-form.js';
import {isEscape} from '../utils/utils.js';

const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';
const SEND_METHOD = 'POST';


const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');
const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const errorButton = errorTemplate.querySelector('.error__button');
const successButton = successTemplate.querySelector('.success__button');

const isSuccess = () => document.body.contains(successMessage);
const isError = () => document.body.contains(errorMessage);

const onDocumentClick = (evt) => {
  if ((!successMessage.contains(evt.target) || !errorMessage.contains(evt.target)) && (isSuccess() || isError())) {
    closeMessageWin();
  }
};

const onDocumentKeyDown = (evt) => {
  if (isEscape(evt) && (isSuccess() || isError())) {
    evt.preventDefault();
    closeMessageWin();
  }
};

const onErrorBtnClick = () => {
  document.body.removeChild(errorMessage);
};

const onSuccessBtnClick = () => {
  document.body.removeChild(successMessage);
  closeModal();
};

function closeMessageWin() {
  errorButton.removeEventListener('click', onErrorBtnClick);
  document.removeEventListener('keydown', onDocumentKeyDown);
  document.removeEventListener('click', onDocumentClick);

  if (isSuccess()) {
    document.body.removeChild(successMessage);
  } else {
    document.body.removeChild(errorMessage);
  }
}

const onUploadSuccess = () => {
  setSubmitButtonState(false);
  document.body.insertAdjacentElement('beforeend', successMessage);
  successButton.addEventListener('click', onSuccessBtnClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
};

const onUploadError = () => {
  setSubmitButtonState(false);
  document.body.insertAdjacentElement('beforeend', errorMessage);
  errorButton.addEventListener('click', onErrorBtnClick);
  document.addEventListener('keydown', onDocumentKeyDown);
  document.addEventListener('click', onDocumentClick);
};

const uploadFormData = (formData) => fetch(
  SERVER_URL,
  {
    method: SEND_METHOD,
    body: formData
  })
  .then((response) => onUploadSuccess(response))
  .catch(() => onUploadError()
  );

export {uploadFormData};
