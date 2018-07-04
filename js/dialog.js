'use strict';

(function () {

  var uploadFile = window.formElements.form.querySelector('#upload-file');
  var uploadOverlay = window.formElements.form.querySelector('.img-upload__overlay');
  var hashtags = window.formElements.hashtags;
  var textarea = window.formElements.textarea;
  var uploadErrorMessage;

  var openUploadOverlay = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onUploadOverlayEscPress);
  };

  var closeUploadOverlay = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onUploadOverlayEscPress);
  };

  var hashtagsOnFocus = false;
  var textareaOnFocus = false;

  hashtags.addEventListener('focus', function () {
    hashtagsOnFocus = true;
  });

  hashtags.addEventListener('blur', function () {
    hashtagsOnFocus = false;
  });

  textarea.addEventListener('focus', function () {
    textareaOnFocus = true;
  });

  textarea.addEventListener('blur', function () {
    textareaOnFocus = false;
  });

  var onUploadOverlayEscPress = function (evt) {
    if (!hashtagsOnFocus && !textareaOnFocus) {
      window.util.isEscEvent(evt, closeUploadOverlay, clearAllEffects);
    }
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
    window.formElements.hashtags.value = '';
    window.formElements.textarea.value = '';
    uploadErrorMessage.remove();
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
    uploadErrorMessage = imgUploadWrapper.querySelector('.error');
    uploadErrorMessage.classList.remove('hidden');
    var errorLinks = uploadErrorMessage.querySelectorAll('.error__links');
    for (var i = 0; i < errorLinks.length; i++) {
      errorLinks[i].addEventListener('click', function (evt) {
        evt.preventDefault();
        closeUploadOverlay();
        clearAllEffects();
      });
    }
  };

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
