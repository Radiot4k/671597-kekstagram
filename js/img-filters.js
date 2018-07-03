'use strict';

(function () {
  var filtersForm = document.querySelector('.img-filters__form');

  var updatePictures = window.debounce(function (filter) {
    var data = window.util.loadData.slice();
    switch (filter) {
      case 'filter-popular':
        window.renderPictures(data);
        break;
      case 'filter-new':
        while (data.length > 10) {
          data.splice(window.util.getRandomNumber(0, data.length - 1), 1);
        }
        window.renderPictures(data);
        break;
      case 'filter-discussed':
        window.renderPictures(data.sort(function (a, b) {
          return b.comments.length - a.comments.length;
        }));
    }
  });

  filtersForm.addEventListener('click', function (evt) {
    for (var i = 0; i < filtersForm.children.length; i++) {
      filtersForm.children[i].classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
    updatePictures(evt.target.id);
  });
})();
