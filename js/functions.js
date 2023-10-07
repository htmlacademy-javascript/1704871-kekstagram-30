/* НЕОПТИМИЗИРОВАННЫЙ ВАРИАНТ НАПИСАНИЯ ФУНКЦИИ*/

// const CHECK_LENGTH = (stroke, availableLength) => {
//   if (stroke.length <= availableLength) {
//     return true;
//   } else {
//     return false;
//   }
// };

/* ОПТИМИЗИРОВАННЫЙ*/

const CHECK_LENGTH = (stroke, availableLength) => (stroke.length <= availableLength);

CHECK_LENGTH('Я помню чудное мгновенье', 10);

const CHECK_PHALINDROME = (phrase) => {
  phrase = phrase.replaceAll(' ', '');
  let result = '';

  for (let i = phrase.length - 1; i >= 0; i--) {
    result += phrase[i];
  }

  if (phrase === result) {
    return true;
  }
  return false;

};

CHECK_PHALINDROME('топ от');


const EXTRACT_NUMBER = (text) => {
  if (typeof text === 'number') {
    text = text.toString();
  }
  return parseInt(text, 10);
};

EXTRACT_NUMBER('2023 год');
