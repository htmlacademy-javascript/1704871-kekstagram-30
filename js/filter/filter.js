import {createMiniatures} from '../post/render-miniatures.js';
import {getRandomArrayElement} from '../utils/utils.js';

const MIN_RANDOM_COUNT = 0;
const MAX_RANDOM_COUNT = 10;

const sortMostDiscussed = (images) => images.slice().sort((current, next) => current.comments.length < next.comments.length);

const clearMiniatures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((element) => element.remove());
};

const applyDefaultFilter = (images) => {
  clearMiniatures();
  createMiniatures(images);
};

const applyRandomFilter = (images) => {
  const randomImageSet = new Set(Array.from({length: images.length}, () => getRandomArrayElement(images)));
  const filteredImages = Array.from(randomImageSet.values()).slice(MIN_RANDOM_COUNT, MAX_RANDOM_COUNT);
  clearMiniatures();
  createMiniatures(filteredImages);
};

const applyDiscussedFilter = (images) => {
  clearMiniatures();
  createMiniatures(sortMostDiscussed(images));
};

export {applyDefaultFilter, applyRandomFilter, applyDiscussedFilter};

