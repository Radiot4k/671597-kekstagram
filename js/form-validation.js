'use strict';

window.formValidation = (function () {
  var hashtags = window.formElements.hashtags;
  return {
    getHashtagsError: function () {
      var hashtagsArray = hashtags.value.split(' ');
      if (hashtagsArray.length > 5) {
        return 'Максимальное количество хэш-тегов - 5';
      }
      if (hashtagsArray[0]) {
        for (var i = 0; i < hashtagsArray.length; i++) {
          if (hashtagsArray[i].charAt(0) !== '#') {
            return 'Хэш-тег должен начинается с символа # (решётка)';
          }
          if (hashtagsArray[i] === '#') {
            return 'Хеш-тег не может состоять только из одной решётки';
          }
          if (hashtagsArray[i].length > 20) {
            return 'Максимальная длина одного хэш-тега - 20 символов, включая решётку';
          }
          for (var j = i + 1; j < hashtagsArray.length; j++) {
            if (i === hashtagsArray.length - 1) {
              break;
            } else if (hashtagsArray[i].toLowerCase() === hashtagsArray[j].toLowerCase()) {
              return 'Два одинаковых хэш-тега недопустимо';
            }
          }
        }
      }
      return '';
    }
  };
})();
