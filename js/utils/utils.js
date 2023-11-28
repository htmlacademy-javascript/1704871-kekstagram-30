const DELAY = 500;

const isEscape = (evt) => evt.key === 'Escape';

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscape, getRandomInteger, getRandomArrayElement, debounce};
