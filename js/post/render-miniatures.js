import { createPosts } from './data.js';
import { renderBigPicture } from './render-full-photo.js';

const pictureContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureThumbnails = createPosts();

const createPicture = (pictureData) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');

  pictureImg.src = pictureData.url;
  pictureImg.alt = pictureData.description;
  pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

  pictureImg.addEventListener('click', () => renderBigPicture(pictureData));

  pictureContainer.appendChild(pictureElement);
};

const createMiniatures = () => {
  pictureThumbnails.forEach((picture) => createPicture(picture));
};

export {createMiniatures};
