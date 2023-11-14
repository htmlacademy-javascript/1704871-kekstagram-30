const form = document.querySelector('#upload-select-image');

form.setAttribute('method', 'post');
form.setAttribute('enctype', 'multipart/form-data');
form.setAttribute('action', 'https://30.javascript.pages.academy/kekstagram');

export {form};
