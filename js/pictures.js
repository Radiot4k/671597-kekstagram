'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var picturesContainer = document.querySelector('.pictures');

  var getCommentsArray = function () {
    var commentsQuantity = window.util.getRandomNumber(1, 2);
    var commentsArray = [];
    for (var i = 0; i < commentsQuantity; i++) {
      commentsArray[i] = COMMENTS[window.util.getRandomNumber(0, 5)];
    }
    return commentsArray;
  };

  for (var i = 1; i <= 25; i++) {
    window.util.pictures[i - 1] = {
      url: 'photos/' + i + '.jpg',
      likes: window.util.getRandomNumber(15, 200),
      comments: getCommentsArray(),
      description: DESCRIPTIONS[window.util.getRandomNumber(0, 5)]
    };
  }

  var fragment = document.createDocumentFragment();

  for (i = 0; i < window.util.pictures.length; i++) {
    fragment.appendChild(window.util.createFragment(pictureTemplate, window.util.pictures[i]));
  }

  picturesContainer.appendChild(fragment);
})();
