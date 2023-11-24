const SEND_SERVER_URL = 'https://30.javascript.pages.academy/kekstagram/data';
const ALERT_DURATION_TIME = 5000;

import {createMiniatures} from '../post/render-miniatures.js';

const dataErrorTemplate = document.querySelector('#data-error').content;
const dataError = dataErrorTemplate.querySelector('.data-error');

const hideErrorMessage = () => {
  setTimeout(() => {
    document.body.removeChild(dataError);
  }, ALERT_DURATION_TIME);
};

const handleError = () => {
  document.body.insertAdjacentElement('beforeend', dataError);
  hideErrorMessage();
};

const getData = () => fetch(SEND_SERVER_URL)
  .then((response) => response.json())
  .then((data) => createMiniatures(data))
  .catch(() => handleError());

export {getData};
