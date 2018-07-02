'use strict';

(function () {
  var ESC_KEYCODE = 27;

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
    if (evt.keyCode === ESC_KEYCODE) {
      closeUploadOverlay();
      clearAllEffects();
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
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  window.formElements.form.addEventListener('submit', function (evt) {
    var errorMessage = window.formValidation.getHashtagsError();
    if (errorMessage) {
      evt.preventDefault();
      window.formValidation.customValidity(errorMessage);
    } else {
      window.formValidation.customValidity('');
    }
  });

  window.formElements.form.addEventListener('reset', function (evt) {
    evt.preventDefault();
    closeUploadOverlay();
    clearAllEffects();
  });
})();
