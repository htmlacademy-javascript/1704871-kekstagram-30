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
const bigPictureCommentsList = document.querySelector('.social__comments');
const bigPictureCommentTemplate = document.querySelector('.social__comment');
const bigPictureCommentsLoader = document.querySelector('.social__comments-loader');
const bigPictureCloseBtn = document.querySelector('.big-picture__cancel');


const closeModal = () => {
  bigPicture.classList.add('hidden');
};

const addEventListeners = () => {
  bigPictureCloseBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  });
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
};

const hideCommentsLoadBtn = () => {
  bigPictureCommentsLoader.classList.add('hidden');
};

const showCommentsLoadBtn = () => {
  bigPictureCommentsLoader.classList.remove('hidden');
};

const appendCommentsLoaderBtn = () => {
  bigPictureSocial.append(bigPictureCommentsLoader);
};

const createComment = (text, url, name) => {
  const newComment = bigPictureCommentTemplate.cloneNode(true);
  const commentAvatar = newComment.querySelector('.social__picture');
  commentAvatar.src = url;
  commentAvatar.alt = name;
  newComment.querySelector('.social__text').textContent = text;
  return newComment;
};

const renderCommentsByCount = (currentId, count) => {
  bigPictureCommentsList.innerHTML = '';
  for (let i = 0; i < count; i++) {
    bigPictureCommentsList.appendChild(createComment(postsCopy[currentId].comments[i].message, postsCopy[currentId].comments[i].avatar, postsCopy[currentId].comments[i].name));
  } return bigPictureCommentsList;
};

const addBigPictureInfo = (currentId, commentsCount, commentsFinalQuantity) => {
  bigPictureImg.src = postsCopy[currentId].url;
  bigPictureDescription.textContent = postsCopy[currentId].description;
  bigPictureLikesCount.textContent = postsCopy[currentId].likes;
  bigPictureCommentsTotalCount.textContent = commentsFinalQuantity;
  bigPictureCommentsShownCount.textContent = commentsCount;
};

const renderComments = (currentId, commentsCount, commentsFinalQuantity) => {
  bigPictureSocial.append(renderCommentsByCount(currentId, commentsCount));
  bigPictureCommentsLoader.addEventListener('click', () => {
    if (commentsFinalQuantity - commentsCount < 5) {
      commentsCount = commentsFinalQuantity;
    } else {
      commentsCount = commentsCount + 5;
    }
    bigPictureSocial.append(renderCommentsByCount(currentId, commentsCount));
    bigPictureCommentsShownCount.textContent = Object.keys(document.querySelectorAll('.social__comment')).length;
    if (Object.keys(document.querySelectorAll('.social__comment')).length === commentsFinalQuantity) {
      bigPictureCommentsShownCount.textContent = bigPictureCommentsTotalCount.textContent;
      hideCommentsLoadBtn();
    } else {
      showCommentsLoadBtn();
    }
    appendCommentsLoaderBtn();
  });
};

const renderBigPicture = (currentId) => {
  let commentsCount = COMMENTS_SHOWN_COUNT;
  showCommentsLoadBtn();
  const commentsFinalQuantity = postsCopy[currentId].comments.length;
  if (commentsFinalQuantity <= 5) {
    commentsCount = commentsFinalQuantity; hideCommentsLoadBtn();
  }
  addBigPictureInfo(currentId, commentsCount, commentsFinalQuantity);
  renderComments(currentId, commentsCount, commentsFinalQuantity);
  appendCommentsLoaderBtn();
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
