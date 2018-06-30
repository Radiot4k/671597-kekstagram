'use strict';

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

var ESC_KEYCODE = 27;

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
var picturesContainer = document.querySelector('.pictures');
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
  if (element.querySelector('.picture__img')) {
    element.querySelector('.picture__img').src = val.url;
  }
  if (element.querySelector('.picture__stat--likes')) {
    element.querySelector('.picture__stat--likes').textContent = val.likes;
  }
  if (element.querySelector('.picture__stat--comments')) {
    element.querySelector('.picture__stat--comments').textContent = val.comments.length;
  }
  if (element.querySelector('.social__picture')) {
    element.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
  }
  if (element.querySelector('.social__text')) {
    element.querySelector('.social__text').textContent = val;
  }

  return element;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < pictures.length; i++) {
  fragment.appendChild(createFragment(pictureTemplate, pictures[i]));
}
picturesContainer.appendChild(fragment);

var pictureBig = document.querySelector('.big-picture');

var pictureBigElements = pictureBig.querySelectorAll('.big-picture__img img, .likes-count, .comments-count, .social__caption, .social__comment-count, .social__loadmore, #picture-cancel');
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
for (i = 0; i < pictures[0].comments.length; i++) {
  fragment.appendChild(createFragment(commentTemplate, pictures[0].comments[i]));
}
commentsList.appendChild(fragment);

// --------------------------------------------------------------------------

var picturesList = picturesContainer.querySelectorAll('.picture__link');

var openBigPicture = function () {
  pictureBig.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
};

var closeBigPicture = function () {
  pictureBig.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
};

var onBigPictureEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
};

for (i = 0; i < picturesList.length; i++) {
  picturesList[i].addEventListener('click', function () {
    openBigPicture();
  });
}

pictureBigElements[6].addEventListener('click', function () {
  closeBigPicture();
});

// ---------------------------------------------------------------------

var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.img-upload__overlay');

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
  imagePreviewImg.removeAttribute('class');
  imagePreviewImg.removeAttribute('style');
  imagePreview.removeAttribute('style');

};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

// --------------------------------------------------------------------------

var imagePreview = uploadOverlay.querySelector('.img-upload__preview');
var imagePreviewImg = imagePreview.querySelector('img');
var effectsList = uploadOverlay.querySelector('.effects__list');
var scale = document.querySelector('.scale');
scale.classList.add('hidden');

var addEffect = function (effect) {
  imagePreviewImg.removeAttribute('class');
  imagePreviewImg.removeAttribute('style');
  scalePin.style.left = '100%';
  scaleLevel.style.width = '100%';
  scaleValue.value = '100';

  if (effect !== 'none') {
    scale.classList.remove('hidden');
    imagePreviewImg.classList.add('effects__preview--' + effect);
  } else {
    scale.classList.add('hidden');
  }
};

effectsList.addEventListener('click', function (evt) {
  if (evt.target.nodeName === 'INPUT') {
    addEffect(evt.target.value);
  }
});

// -------------------------------------------------------------------------

var resizeControls = uploadOverlay.querySelectorAll('.resize__control');

var getNewSize = function (elem, currentSize) {
  var newSize = parseInt(currentSize.replace('%', ''), 10);
  if (elem.classList.contains('resize__control--plus')) {
    newSize += 25;
    if (newSize > 100) {
      newSize = 100;
    }
  } else {
    newSize -= 25;
    if (newSize < 25) {
      newSize = 25;
    }
  }
  return newSize + '%';
};

var resizePicture = function (size) {
  imagePreview.style.transform = 'scale(' + size.replace('%', '') / 100 + ')';
};

for (i = 0; i < resizeControls.length; i++) {
  if (!resizeControls[i].classList.contains('resize__control--value')) {
    resizeControls[i].addEventListener('click', function (evt) {
      resizeControls[1].value = getNewSize(evt.currentTarget, resizeControls[1].value);
      resizePicture(resizeControls[1].value);
    });
  }
}

// ----------------------------------------------------------------------------

var uploadForm = document.querySelector('#upload-select-image');
var textDescription = uploadForm.querySelector('.text__description');
var hashtags = uploadForm.querySelector('.text__hashtags');

// Как принудительно заставить выводить сообщение?
textDescription.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length > 140) {
    target.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    target.setCustomValidity('');
  }
});

var getHashtagsError = function () {
  var hashtagsArray = hashtags.value.split(' ');
  if (hashtagsArray.length > 5) {
    return 'Максимальное количество хэш-тегов - 5';
  } else if (hashtagsArray[0]) {
    for (i = 0; i < hashtagsArray.length; i++) {
      if (hashtagsArray[i].charAt(0) !== '#') {
        return 'Хэш-тег должен начинается с символа # (решётка)';
      } else if (hashtagsArray[i] === '#') {
        return 'Хеш-тег не может состоять только из одной решётки';
      } else if (hashtagsArray[i].length > 20) {
        return 'Максимальная длина одного хэш-тега - 20 символов, включая решётку';
      } else {
        for (var j = i + 1; j < hashtagsArray.length; j++) {
          if (i === hashtagsArray.length - 1) {
            break;
          } else if (hashtagsArray[i].toLowerCase() === hashtagsArray[j].toLowerCase()) {
            return 'Два одинаковых хэш-тега недопустимо';
          }
        }
      }
    }
  }
  return '';
};

uploadForm.addEventListener('submit', function (evt) {
  if (getHashtagsError()) {
    evt.preventDefault();
    hashtags.setCustomValidity(getHashtagsError());
    hashtags.addEventListener('input', function () {
      hashtags.setCustomValidity(getHashtagsError());
    });
  } else {
    hashtags.setCustomValidity('');
  }
});

uploadForm.addEventListener('reset', function (evt) {
  evt.preventDefault();
  closeUploadOverlay();
  clearAllEffects();
});

// -----------------------------------------------------------------

var scalePin = uploadForm.querySelector('.scale__pin');
var scaleLevel = uploadForm.querySelector('.scale__level');
var scaleValue = uploadForm.querySelector('.scale__value');
var scaleLine = uploadForm.querySelector('.scale__line');

var setEffectLevel = function (effectLevel) {
  var effect;
  switch (imagePreviewImg.classList[0]) {
    case 'effects__preview--chrome' :
      effect = effectLevel / 100;
      imagePreviewImg.style.filter = 'grayscale(' + effect + ')';
      break;
    case 'effects__preview--sepia' :
      effect = effectLevel / 100;
      imagePreviewImg.style.filter = 'sepia(' + effect + ')';
      break;
    case 'effects__preview--marvin' :
      effect = effectLevel;
      imagePreviewImg.style.filter = 'invert(' + effect + '%)';
      break;
    case 'effects__preview--phobos' :
      effect = effectLevel * 3 / 100;
      imagePreviewImg.style.filter = 'blur(' + effect + 'px)';
      break;
    case 'effects__preview--heat' :
      effect = effectLevel * 2 / 100 + 1;
      imagePreviewImg.style.filter = 'brightness(' + effect + ')';
  }
};

scalePin.style.left = '100%';
scaleLevel.style.width = '100%';
scaleValue.value = '100';

scalePin.addEventListener('mousedown', function (evt) {
  var startX = evt.clientX;
  var effectValue;

  var onMouseMove = function (moveEvt) {
    var shift = startX - moveEvt.clientX;

    startX = moveEvt.clientX;
    effectValue = (scalePin.offsetLeft - shift) * 100 / scaleLine.offsetWidth;
    if (effectValue < 0) {
      effectValue = 0;
    } else if (effectValue > 100) {
      effectValue = 100;
    }

    scaleValue.value = Math.round(effectValue).toString();
    scalePin.style.left = effectValue + '%';
    scaleLevel.style.width = effectValue + '%';
    setEffectLevel(scaleValue.value);
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
