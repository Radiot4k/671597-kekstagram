'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');

  var onSuccess = function (pictures) {
    var fragment = document.createDocumentFragment();

    window.util.loadData = pictures;

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(window.util.createFragment(pictureTemplate, pictures[i]));
    }

    picturesContainer.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('beforebegin', node);
  };

  window.backend.load(onSuccess, onError);
})();
