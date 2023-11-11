import {createPosts} from './data.js';

const pictureContainer = document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const postsCopy = createPosts().slice();

const pictureListFragment = document.createDocumentFragment();

postsCopy.forEach(({url, likes, comments, id}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.dataset.id = (id - 1);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.append(pictureElement);
});

pictureContainer.append(pictureListFragment);

export {postsCopy};

