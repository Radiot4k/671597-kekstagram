'use strict';

(function () {
  var resizeControls = window.formElements.resizeControls;
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
    window.formElements.preview.style.transform = 'scale(' + size.replace('%', '') / 100 + ')';
  };

  for (var i = 0; i < resizeControls.length; i++) {
    if (!resizeControls[i].classList.contains('resize__control--value')) {
      resizeControls[i].addEventListener('click', function (evt) {
        resizeControls[1].value = getNewSize(evt.currentTarget, resizeControls[1].value);
        resizePicture(resizeControls[1].value);
      });
    }
  }

  var scale = window.formElements.scale;
  scale.classList.add('hidden');

  var addEffect = function (effect) {
    window.formElements.img.removeAttribute('class');
    window.formElements.img.removeAttribute('style');
    scalePin.style.left = '100%';
    scaleLevel.style.width = '100%';
    scaleValue.value = '100';

    if (effect !== 'none') {
      scale.classList.remove('hidden');
      window.formElements.img.classList.add('effects__preview--' + effect);
    } else {
      scale.classList.add('hidden');
    }
  };

  window.formElements.effectsList.addEventListener('click', function (evt) {
    if (evt.target.nodeName === 'INPUT') {
      addEffect(evt.target.value);
    }
  });

  // -----------------------------------------------------------------

  var scaleLine = window.formElements.form.querySelector('.scale__line');
  var scalePin = scaleLine.querySelector('.scale__pin');
  var scaleLevel = scaleLine.querySelector('.scale__level');
  var scaleValue = window.formElements.form.querySelector('.scale__value');


  var setEffectLevel = function (effectLevel) {
    var effect;
    switch (window.formElements.img.classList[0]) {
      case 'effects__preview--chrome' :
        effect = effectLevel / 100;
        window.formElements.img.style.filter = 'grayscale(' + effect + ')';
        break;
      case 'effects__preview--sepia' :
        effect = effectLevel / 100;
        window.formElements.img.style.filter = 'sepia(' + effect + ')';
        break;
      case 'effects__preview--marvin' :
        effect = effectLevel;
        window.formElements.img.style.filter = 'invert(' + effect + '%)';
        break;
      case 'effects__preview--phobos' :
        effect = effectLevel * 3 / 100;
        window.formElements.img.style.filter = 'blur(' + effect + 'px)';
        break;
      case 'effects__preview--heat' :
        effect = effectLevel * 2 / 100 + 1;
        window.formElements.img.style.filter = 'brightness(' + effect + ')';
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
      effectValue = effectValue < 0 ? 0 : effectValue > 100 ? 100 : effectValue;

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
})();
