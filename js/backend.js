'use strict';

window.backend = (function () {
  var SUCCESS_CODE = 200;

  var Url = {
    load: 'https://js.dump.academy/kekstagram/data',
    save: 'https://js.dump.academy/kekstagram'
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
      getRequest(Url.load, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      getRequest(Url.save, 'POST', onLoad, onError, data);
    }
  };
})();
