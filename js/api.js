const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  [Method.GET]: 'Ошибка загрузки данных. Попробуйте обновить страницу',
  [Method.POST]: 'Ошибка отправки данных. Попробуйте ещё раз',
};

const load = (route, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorText[method]);
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(ErrorText[method]);
    });

const getData = () => load(Route.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, Method.POST, body);

export {getData, sendData};
