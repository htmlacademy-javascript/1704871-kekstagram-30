import {pictureThumbnails, postsCopy} from './render.js';
import {createPosts} from './utils.js';

console.log(postsCopy);

const bigPicture = document.querySelector('.big-picture');
const allPictures = document.querySelectorAll('.picture');
let pictureButton = document.querySelector('.picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
let forId = 1;

// const addComment = (objectId) => {
//   const newComment = document.createElement('li');
//   newComment.classList.add('social__comment');
//   const pic = document.createElement('img');
//   pic.classList.add('social__picture');
//   pic.src = 'img/avatar-4.svg';
//   pic.alt = 'CommentatorName';
//   pic.width = '35';
//   pic.height = '35';
//   const p = document.createElement('p');
//   p.classList.add('social__text');
//   p.textContent = 'blablabla';
//   newComment.appendChild(pic);
//   newComment.appendChild(p);
//   return newComment;
// };

const addComment = (objectId) => {
  const newComment = document.createElement('li');
  newComment.classList.add('social__comment');
  const pic = document.createElement('img');
  pic.classList.add('social__picture');
  pic.src = 'img/avatar-4.svg';
  pic.alt = 'CommentatorName';
  pic.width = '35';
  pic.height = '35';
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = 'blablabla';
  newComment.appendChild(pic);
  newComment.appendChild(p);
  return newComment;
};
let objectId = 1;

const addComments = (objectId) => {
  const commentList = document.createElement('ul');
  commentList.classList.add('social__comments');

  for (let i = 0; i < postsCopy[objectId - 1].comments.length; i++) {
    const temp = addComment(postsCopy[objectId - 1].comments[i].message);
    commentList.appendChild(temp);
  }
  return commentList;
};

console.log(addComments(1));

for (pictureButton of allPictures) {
  pictureButton.dataset.index = forId++;
  pictureButton.addEventListener('click', (evt) => {
    bigPicture.querySelector('.comments-loader').classList.add('hidden');
    bigPicture.querySelector('.social__comment-count').classList.add('hidden');
    bigPicture.querySelector('img').src = evt.target.src;
    bigPicture.querySelector('.likes-count').textContent = evt.target.parentNode.querySelector('.picture__likes').textContent;
    bigPicture.querySelector('.social__comment-total-count').textContent = evt.target.parentNode.querySelector('.picture__comments').textContent;
    bigPicture.querySelector('.social__comment-shown-count').textContent = 10;
    // const list = bigPicture.querySelector('.social__comments');
    // list.remove();
    bigPicture.querySelector('.social__comments').innerHTML = '';
    bigPicture.querySelector('.social').appendChild(addComment());
    // console.log(bigPicture.querySelector('.social__comments'));
    bigPicture.querySelector('.social__caption').textContent = postsCopy[evt.target.parentNode.dataset.index].description;
    bigPicture.classList.remove('hidden');
    console.log(evt.target.parentNode.dataset.index);
  });
}

for (pictureButton of allPictures) {
  pictureCancel.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
}


document.addEventListener('keydown', () => {
  bigPicture.classList.add('hidden');
});
