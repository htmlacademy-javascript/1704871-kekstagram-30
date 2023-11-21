const scalePanel = document.querySelector('.img-upload__scale');
const scaleValue = document.querySelector('.scale__control--value');
const uploadedImage = document.querySelector('.img-upload__preview img');

let currentScale = 100;

const onChangeScale = (evt) => {
  if (evt.target.classList.contains('scale__control--smaller')) {
    currentScale = currentScale - 25;
  }
  if (evt.target.classList.contains('scale__control--bigger')) {
    currentScale = currentScale + 25;
  }
  if (currentScale < 25) {
    currentScale = 25;
  }
  if (currentScale > 100) {
    currentScale = 100;
  }
  uploadedImage.setAttribute('style', `transform: scale(${currentScale}%);`);
  scaleValue.value = `${currentScale}%`;
};

const scalePicture = () => {
  scalePanel.addEventListener('click', onChangeScale);
};

export {scalePicture};
