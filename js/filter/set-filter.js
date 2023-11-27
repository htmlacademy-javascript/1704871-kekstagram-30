import {applyDefaultFilter, applyRandomFilter, applyDiscussedFilter} from './filter.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filtersPanel = document.querySelector('.img-filters');

let serverImages = [];
let currentImages = [];

const resetFilterButtons = () => {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');
};

const setButtonState = (evt) => {
  resetFilterButtons();
  evt.target.classList.add('img-filters__button--active');
};

const onDefaultFilterClick = (evt) => {
  setButtonState(evt);
  applyDefaultFilter(serverImages);
};

const onRandomFilterClick = (evt) => {
  setButtonState(evt);
  applyRandomFilter(currentImages);
};

const onDiscussedFilterClick = (evt) => {
  setButtonState(evt);
  applyDiscussedFilter(serverImages);
};

const addFilterListeners = () => {
  filterDefault.addEventListener('click', onDefaultFilterClick);
  filterRandom.addEventListener('click', onRandomFilterClick);
  filterDiscussed.addEventListener('click', onDiscussedFilterClick);
};

const showFilterButtons = () => filtersPanel.classList.remove('img-filters--inactive');

const setFilters = (data) => {
  serverImages = data;
  currentImages = serverImages.slice();
  showFilterButtons();
  addFilterListeners();
};

export {setFilters};
