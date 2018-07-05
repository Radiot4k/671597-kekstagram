'use strict';

window.backend = (function () {
  var SUCCESS_CODE = 200;

  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };

  var getRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
        if (method === 'GET') {
          window.bigPicture.clickListener(xhr.response);
        }
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  return {
    load: function (onLoad, onError) {
      getRequest(Url.LOAD, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      getRequest(Url.SAVE, 'POST', onLoad, onError, data);
    }
  };
})();
