'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, action1, action2) {
      if (evt.keyCode === ESC_KEYCODE) {
        action1();
        if (action2) {
          action2();
        }
      }
    },
    createFragment: function (template, val) {

      var element = template.cloneNode(true);

      if (element.querySelector('.picture__img')) {
        element.querySelector('.picture__img').src = val.url;
      }
      if (element.querySelector('.picture__stat--likes')) {
        element.querySelector('.picture__stat--likes').textContent = val.likes;
      }
      if (element.querySelector('.picture__stat--comments')) {
        element.querySelector('.picture__stat--comments').textContent = val.comments.length;
      }
      if (element.querySelector('.social__picture')) {
        element.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      }
      if (element.querySelector('.social__text')) {
        element.querySelector('.social__text').textContent = val;
      }
      if (element.querySelector('.error')) {
        element.querySelector('.error').textContent += ' ' + val;
      }

      return element;
    },
    getRandomNumber: function (min, max) {
      var number = Math.floor(Math.random() * (max + 1 - min) + min);

      return number;
    }
  };
})();
