import {uploadedImage} from './scale-added-picture';


const effects = {default: 'none', chrome: 'chrome', sepia: 'sepia', marvin: 'marvin', phobos: 'phobos', heat: 'heat'};
const filterEffect = {[effects.chrome]: {style: 'grayscale', unit: ''}, [effects.sepia]: {style: 'sepia', unit: ''}, [effects.marvin]: {style: 'invert', unit: '%'}, [effects.phobos]: {style: 'blur', unit: 'px'}, [effects.heat]: {style:'brightness', unit: ''}};

const sliderOptions = {[effects.default]: { min:0, max: 100, step: 1}, [effects.chrome]: { min: 0, max: 1, step: 0.1}, [effects.sepia]: { min: 0, max: 1, step: 0.1}, [effects.marvin]: { min: 0, max: 100, step: 1}, [effects.phobos]: { min: 0, max: 3, step: 0.1}, [effects.heat]: { min: 0, max: 3, step: 0.1}};

const slider = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevel = document.querySelector('.effect-level__value');
const pageeffects = document.querySelector('.effects');

let currentInstallEffect = effects.default;
const idDefault = () => currentInstallEffect === effects.default;

const setImageStyle = () => {
  if (idDefault()) {
    uploadedImage.style.filter = null;
    return;
  }
  const { value } = effectLevel;
  const { style, unit } = filterEffect[currentInstallEffect];
  uploadedImage.style.filter = `${style}(${value}${unit})`;
};

const hideSlider = () => sliderContainer.classList.add('hidden');
const showSlider = () => sliderContainer.classList.remove('hidden');
const onSliderUpdate = () => {
  effectLevel.value = slider.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({min, max, step}) => {
  noUiSlider.create(slider, {
    range: {min, max},
    step,
    start: max,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  slider.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};


const updateSlider = ({min, max, step}) => {
  slider.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max
  });
};

const setSlider = () => {
  if (idDefault()) {
    hideSlider();
  } else {
    updateSlider(sliderOptions[currentInstallEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  currentInstallEffect = effect;
  setSlider();
  setImageStyle();
};
const resetSlider = () => setEffect(effects.default);
const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};
const initSlider = () => {
  createSlider(sliderOptions[currentInstallEffect]);
  pageeffects.addEventListener('change', onEffectsChange);
};

export {initSlider, resetSlider};
