'use strict';

(function () {
  var filters = document.querySelector('.img-filters');

  var onSuccess = function (pictures) {
    window.util.loadData = pictures;
    window.renderPictures(window.util.loadData);
    filters.classList.remove('img-filters--inactive');
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
