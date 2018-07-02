'use strict';

(function () {
  var picturesList = document.querySelectorAll('.picture__link');
  var pictureBig = document.querySelector('.big-picture');
  var pictureBigElements = pictureBig.querySelectorAll('.big-picture__img img, .likes-count, .comments-count, .social__caption, .social__comment-count, .social__loadmore, #picture-cancel');
  var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
  var commentsList = document.querySelector('.social__comments');

  pictureBigElements[0].src = window.util.pictures[0].url;
  pictureBigElements[2].textContent = window.util.pictures[0].likes;
  pictureBigElements[4].textContent = window.util.pictures[0].comments.length;
  pictureBigElements[1].textContent = window.util.pictures[0].description;
  pictureBigElements[3].classList.add('visually-hidden');
  pictureBigElements[5].classList.add('visually-hidden');

  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }

  var fragment = document.createDocumentFragment();

  for (i = 0; i < window.util.pictures[0].comments.length; i++) {
    fragment.appendChild(window.util.createFragment(commentTemplate, window.util.pictures[0].comments[i]));
  }

  commentsList.appendChild(fragment);

  var openBigPicture = function () {
    pictureBig.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    pictureBig.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  var onBigPictureEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicture);
  };

  for (var i = 0; i < picturesList.length; i++) {
    picturesList[i].addEventListener('click', function () {
      openBigPicture();
    });
  }

  pictureBigElements[6].addEventListener('click', function () {
    closeBigPicture();
  });
})();
