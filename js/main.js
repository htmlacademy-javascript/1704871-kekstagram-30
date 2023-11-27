import { initForm } from './form/create-form';
import {getData} from './server/get-data.js';
import {showFilterPanel} from './filter/filter.js';

initForm();
getData();
showFilterPanel();

console.log(getData());

