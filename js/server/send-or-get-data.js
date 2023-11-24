const SEND_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';
const ALERT_DURATION_TIME = 5000;

import {initForm} from '../form/create-form.js';
import {createMiniatures} from '../post/render-miniatures.js';

const dataErrorTemplate = document.querySelector('#data-error').content;
const dataError = dataErrorTemplate.querySelector('.data-error');

const processData = (data) => {
  createMiniatures(data);
  initForm();
};

const hideErrorMessage = () => {
  setTimeout(() => {
    document.body.removeChild(dataError);
  }, ALERT_DURATION_TIME);
};

const handleError = () => {
  document.body.insertAdjacentElement('beforeend', dataError);
  hideErrorMessage();
};

const init = () => fetch(SEND_SERVER_URL)
  .then((response) => response.json())
  .then((data) => processData(data))
  .catch(() => handleError()
  );

export {init};
