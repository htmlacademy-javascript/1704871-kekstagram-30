import {postsCopy} from './render.js';

const allPictures = document.querySelectorAll('.picture');
const bigPicture = document.querySelector('.big-picture');
const pictureCapture = bigPicture.querySelector('.social__caption');
const pictureCancel = bigPicture.querySelector('.big-picture__cancel');
const pictureSocial = bigPicture.querySelector('.social');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const pictureWindow = bigPicture.querySelector('.comments-loader');
const commentsCountParagraph = bigPicture.querySelector('.social__comment-count');
const pictureImg = bigPicture.querySelector('img');
const pictureLikesCount = bigPicture.querySelector('.likes-count');
const body = document.querySelector('body');
let pictureButton = document.querySelector('.picture');
let forId = 1;


const addComment = (message, avatar, name) => {
  const newComment = document.createElement('li');
  const pic = document.createElement('img');
  const p = document.createElement('p');
  pic.classList.add('social__picture');
  pic.src = avatar;
  pic.alt = name;
  pic.width = '35';
  pic.height = '35';
  p.classList.add('social__text');
  p.textContent = message;
  newComment.classList.add('social__comment');
  newComment.appendChild(pic);
  newComment.appendChild(p);
  return newComment;
};

const addComments = (postIndex) => {
  const commentList = document.createElement('ul');
  commentList.classList.add('social__comments');

  for (let i = 0; i < postsCopy[postIndex].comments.length; i++) {
    const temp = addComment(
      (postsCopy[postIndex].comments[i].message),
      (postsCopy[postIndex].comments[i].avatar),
      (postsCopy[postIndex].comments[i].name));
    commentList.appendChild(temp);
  }
  return commentList;
};

const addListeners = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });
  for (pictureButton of allPictures) {
    pictureCancel.addEventListener('click', () => {
      bigPicture.classList.add('hidden');
      body.classList.remove('modal-open');
    });
  }
};


const addTemplate = () => {
  for (pictureButton of allPictures) {
    pictureButton.dataset.index = forId++;
    pictureButton.addEventListener('click', (evt) => {
      const postIndex = (evt.target.parentNode.dataset.index - 1);
      pictureWindow.classList.add('hidden');
      body.classList.add('modal-open');
      commentsCountParagraph.classList.add('hidden');
      pictureImg.src = evt.target.src;
      pictureLikesCount.textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
      commentTotalCount.textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
      commentShownCount.textContent = 10;
      bigPicture.querySelector('.social__comments').remove();
      pictureSocial.appendChild(addComments(postIndex));
      pictureCapture.textContent = postsCopy[postIndex].description;
      bigPicture.classList.remove('hidden');
    });
  }
};

const getFullPhoto = () => {
  addListeners();
  addTemplate();
  addComments();
  addComment();
};

export {getFullPhoto};

