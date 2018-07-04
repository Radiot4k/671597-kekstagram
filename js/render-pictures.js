'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');

  window.renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    while (picturesContainer.children.length > 2) {
      picturesContainer.lastElementChild.remove();
    }

    pictures.forEach(function (it) {
      fragment.appendChild(window.util.createFragment(pictureTemplate, it));
    });

    picturesContainer.appendChild(fragment);

    window.bigPicture.clickListener(pictures);
  };
})();
