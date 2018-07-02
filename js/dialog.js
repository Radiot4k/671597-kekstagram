'use strict';

(function () {

  var uploadFile = window.formElements.form.querySelector('#upload-file');
  var uploadOverlay = window.formElements.form.querySelector('.img-upload__overlay');

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  var onUploadOverlayEscPress = function (evt) {
    window.util.isEscEvent(evt, closeUploadOverlay, clearAllEffects);
  };

  var clearAllEffects = function () {
    window.formElements.img.removeAttribute('class');
    window.formElements.img.removeAttribute('style');
    window.formElements.preview.removeAttribute('style');
    window.formElements.resizeControls[1].value = '100%';
    window.formElements.scale.classList.add('hidden');
    uploadFile.value = '';
    var effectsRadioList = window.formElements.effectsList.querySelectorAll('.effects__radio');
    for (var i = 0; i < effectsRadioList.length; i++) {
      effectsRadioList[i].checked = false;
    }
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  var onSuccess = function () {
    closeUploadOverlay();
    clearAllEffects();
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#picture').content.querySelector('.error');
    var imgUploadWrapper = uploadOverlay.querySelector('.img-upload__wrapper');

    imgUploadWrapper.appendChild(window.util.createFragment(errorTemplate, errorMessage));
    imgUploadWrapper.querySelector('.error').classList.remove('hidden');
  };

  var hashtags = window.formElements.hashtags;

  hashtags.addEventListener('input', function () {
    hashtags.setCustomValidity(window.formValidation.getHashtagsError());
  });

  window.formElements.form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(window.formElements.form), onSuccess, onError);
  });

  window.formElements.form.addEventListener('reset', function (evt) {
    evt.preventDefault();
    closeUploadOverlay();
    clearAllEffects();
  });


})();
