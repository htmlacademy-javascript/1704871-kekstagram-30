
import {isEscape} from '../utils/utils.js';

const COMMENTS_SHOWN_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureDescription = document.querySelector('.social__caption');
const cancelButton = document.querySelector('.big-picture__cancel');
const commentContainer = document.querySelector('.social__comment');
const commentText = document.querySelector('.social__text');
const commentsLoadButton = document.querySelector('.social__comments-loader');
const commentsShownCount = document.querySelector('.social__comment-shown-count');
const commentsTotalCount = document.querySelector('.social__comment-total-count');

let shownComments = 0;
let comments = [];

const onCancelButtonClick = () => {
  hideModal();
};

const onDocumentKeydown = (evt) => {
  if (isEscape(evt)) {
    hideModal();
  }
};

const setButtonState = () => {
  commentsLoadButton.classList.toggle('hidden', shownComments >= comments.length);
};

const createComment = (comment) => {
  const commentClone = commentContainer.cloneNode(true);
  const commentPicture = commentClone.querySelector('.social__picture');
  commentPicture.src = comment.avatar;
  commentPicture.alt = comment.name;
  commentText.textContent = comment.message;
  return commentClone;
};

const renderComments = (pictureComments) => {
  pictureComments.slice(shownComments, shownComments + COMMENTS_SHOWN_COUNT).forEach((comment) => bigPictureComments.appendChild(createComment(comment)));
  shownComments = Math.min(shownComments + COMMENTS_SHOWN_COUNT, pictureComments.length);
  commentsShownCount.textContent = shownComments;
  setButtonState();
};

const onCommentsLoadButtonClick = () => {
  renderComments(comments);
  setButtonState();
};

function hideModal(){
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  cancelButton.removeEventListener('click', onCancelButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsLoadButton.classList.remove('hidden');
  shownComments = 0;
}

function showModal() {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoadButton.addEventListener('click', onCommentsLoadButtonClick);
  cancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
}

const createBigPicture = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  bigPictureLikes.textContent = picture.likes;
  commentsTotalCount.textContent = picture.comments.length;
  bigPictureDescription.textContent = picture.description;
};

const renderBigPicture = (picture) => {
  comments = picture.comments;
  bigPictureComments.innerHTML = '';
  createBigPicture(picture);
  renderComments(comments);
  showModal();
};

export {renderBigPicture};
