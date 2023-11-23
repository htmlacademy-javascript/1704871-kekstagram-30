const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
// const scalePanel = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');
const uploadedImage = document.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const changeScale = () => {
  uploadedImage.style.transform = `scale(${currentScale}%)`;
  scaleValue.value = `${currentScale}%`;
};

const onMinusButtonClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  changeScale();
};

const onPlusButtonClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  changeScale();
};

const resetScale = () => {
  currentScale = MAX_SCALE;
  changeScale();
};

const scalePicture = () => {
  minusButton.addEventListener('click', onMinusButtonClick);
  plusButton.addEventListener('click', onPlusButtonClick);
};

export {scalePicture, resetScale};
