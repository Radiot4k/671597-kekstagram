'use strict';

window.bigPicture = (function () {
  return {
    clickListener: function (data) {
      var picturesList = document.querySelectorAll('.picture__link');
      var pictureBig = document.querySelector('.big-picture');
      var close = pictureBig.querySelector('#picture-cancel');
      var body = document.querySelector('body');

      var renderBigPicture = function (numberOfPicture) {
        var DESCRIPTIONS = [
          'Тестим новую камеру!',
          'Затусили с друзьями на море',
          'Как же круто тут кормят',
          'Отдыхаем...',
          'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
          'Вот это тачка!'
        ];

        var pictureBigElements = pictureBig.querySelectorAll('.big-picture__img img, .likes-count, .comments-count, .social__caption, .social__comment-count, .social__loadmore');
        var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
        var commentsList = document.querySelector('.social__comments');

        pictureBigElements[0].src = data[numberOfPicture].url;
        pictureBigElements[1].textContent = DESCRIPTIONS[window.util.getRandomNumber(0, 5)];
        pictureBigElements[2].textContent = data[numberOfPicture].likes;
        pictureBigElements[3].classList.add('visually-hidden');
        pictureBigElements[4].textContent = data[numberOfPicture].comments.length;
        pictureBigElements[5].classList.add('visually-hidden');

        while (commentsList.firstChild) {
          commentsList.removeChild(commentsList.firstChild);
        }

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < data[numberOfPicture].comments.length; i++) {
          fragment.appendChild(window.util.createFragment(commentTemplate, data[numberOfPicture].comments[i]));
        }

        commentsList.appendChild(fragment);
      };

      var openBigPicture = function (numberOfPicture) {
        body.classList.add('modal-open');
        renderBigPicture(numberOfPicture);
        pictureBig.classList.remove('hidden');
        document.addEventListener('keydown', onBigPictureEscPress);
      };

      var closeBigPicture = function () {
        body.classList.remove('modal-open');
        pictureBig.classList.add('hidden');
        document.removeEventListener('keydown', onBigPictureEscPress);
      };

      var onBigPictureEscPress = function (evt) {
        window.util.isEscEvent(evt, closeBigPicture);
      };

      var addClickListener = function (numberOfPicture) {
        picturesList[numberOfPicture].addEventListener('click', function () {
          openBigPicture(numberOfPicture);
        });
      };

      for (var i = 0; i < data.length; i++) {
        addClickListener(i);
      }

      close.addEventListener('click', function () {
        closeBigPicture();
      });
    }
  };
})();
