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
var picturesList = document.querySelector('.pictures');
var commentTemplate = document.querySelector('#picture').content.querySelector('.social__comment');
var commentsList = document.querySelector('.social__comments');

var getRandomNumber = function (min, max) {
  var number = Math.floor(Math.random() * (max + 1 - min) + min);

  return number;
};

var getCommentsArray = function () {
  var commentsQuantity = getRandomNumber(1, 2);
  var commentsArray = [];
  for (var i = 0; i < commentsQuantity; i++) {
    commentsArray[i] = COMMENTS[getRandomNumber(0, 5)];
  }
  return commentsArray;
};

var pictures = [];

for (var i = 1; i <= 25; i++) {
  pictures[i - 1] = {
    url: 'photos/' + i + '.jpg',
    likes: getRandomNumber(15, 200),
    comments: getCommentsArray(),
    description: DESCRIPTIONS[getRandomNumber(0, 5)]
  };
}

var createFragment = function (template, val) {
  var element = template.cloneNode(true);
  if(element.querySelector('.picture__img')) {
    element.querySelector('.picture__img').src = val.url;
  }
  if(element.querySelector('.picture__stat--likes')) {
    element.querySelector('.picture__stat--likes').textContent = val.likes;
  }
  if(element.querySelector('.picture__stat--comments')) {
    element.querySelector('.picture__stat--comments').textContent = val.comments.length;
  }
  if(element.querySelector('.social__picture')) {
    element.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  }
  if(element.querySelector('.social__text')) {
    element.querySelector('.social__text').textContent = val;
  }

  return element;
}

var fragment = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(createFragment(pictureTemplate, pictures[i]));
}
picturesList.appendChild(fragment);

var pictureBig = document.querySelector('.big-picture');
pictureBig.classList.remove('hidden');

var pictureBigElements = pictureBig.querySelectorAll('.big-picture__img img, .likes-count, .comments-count, .social__caption, .social__comment-count, .social__loadmore');
pictureBigElements[0].src = pictures[0].url;
pictureBigElements[2].textContent = pictures[0].likes;
pictureBigElements[4].textContent = pictures[0].comments.length;
pictureBigElements[1].textContent = pictures[0].description;
pictureBigElements[3].classList.add('visually-hidden');
pictureBigElements[5].classList.add('visually-hidden');

while (commentsList.firstChild) {
  commentsList.removeChild(commentsList.firstChild);
}

fragment = document.createDocumentFragment();
for (var i = 0; i < pictures[0].comments.length; i++) {
  fragment.appendChild(createFragment(commentTemplate, pictures[0].comments[i]));
}
commentsList.appendChild(fragment);
