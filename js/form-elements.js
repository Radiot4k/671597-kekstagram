'use strict';

window.formElements = (function () {
  return {
    form: document.querySelector('#upload-select-image'),
    preview: document.querySelector('.img-upload__preview'),
    img: document.querySelector('.img-upload__preview img'),
    resizeControls: document.querySelectorAll('.resize__control'),
    scale: document.querySelector('.scale'),
    effectsList: document.querySelector('.effects__list'),
    hashtags: document.querySelector('.text__hashtags'),
    textarea: document.querySelector('.text__description')
  };
})();


