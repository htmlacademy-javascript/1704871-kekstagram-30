import {postsCopy} from './render.js';

const COMMENTS_SHOWN_COUNT = 5;

const container = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureSocial = document.querySelector('.big-picture__social');
const bigPictureImg = document.querySelector('.big-picture img');
const bigPictureDescription = document.querySelector('.social__caption');
const bigPictureLikesCount = document.querySelector('.likes-count');
const bigPictureCommentsTotalCount = document.querySelector('.social__comment-total-count');
const bigPictureCommentsShownCount = document.querySelector('.social__comment-shown-count');
const bigPictureComment = document.querySelector('.social__comment');
const bigPictureCommentsList = document.querySelector('.social__comments');
const bigPictureCommentsLoader = document.querySelector('.social__comments-loader');
const bigPictureCommentsCountsBlock = document.querySelector('.social__comment-count');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');

console.log(postsCopy);

const closeModal = () => {
  bigPicture.classList.add('hidden');
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
};

const addEventListeners = () => {
  bigPictureCloseBtn.addEventListener('click', closeModal);
};

const createComment = (text, url) => {
  const comment = document.createElement('li');
  const avatar = document.createElement('img');
  const paragraph = document.createElement('p');
  comment.classList.add('social__comment');
  avatar.classList.add('social__picture');
  avatar.src = url;
  avatar.width = '35';
  avatar.height = '35';
  paragraph.classList.add('social__text');
  paragraph.textContent = text;
  comment.appendChild(avatar);
  comment.appendChild(paragraph);
  return comment;

};

const renderCommentsByCount = (currentId, count) => {
  bigPictureCommentsList.innerHTML = '';
  if (postsCopy[currentId].comments.length < count) {
    count = postsCopy[currentId].comments.length;
  }
  for (let i = 0; i < count; i++) {
    bigPictureCommentsList.appendChild(
      createComment(
        postsCopy[currentId].comments[i].message,
        postsCopy[currentId].comments[i].avatar)
);
  }
  return bigPictureCommentsList;
};

console.log(renderCommentsByCount(1, 5));

const renderBigPicture = (currentId) => {
  bigPictureImg.src = postsCopy[currentId].url;
  bigPictureDescription.textContent = postsCopy[currentId].description;
  bigPictureLikesCount.textContent = postsCopy[currentId].likes;
  bigPictureCommentsTotalCount.textContent = postsCopy[currentId].comments.length;
  bigPictureCommentsShownCount.textContent = COMMENTS_SHOWN_COUNT;
  bigPictureCommentsList.remove();
  bigPictureSocial.append(renderCommentsByCount(currentId, COMMENTS_SHOWN_COUNT));
  // bigPictureCommentsLoader.remove();
  bigPictureCommentsCountsBlock.remove();
  openModal();
};

const renderGallery = () => {
  addEventListeners();
  container.addEventListener('click', (evt) => {
    const currentId = evt.target.parentNode.dataset.id;
    renderBigPicture(currentId);
  });
};

export {renderGallery};
