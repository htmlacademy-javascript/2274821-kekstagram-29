// Получение данных
const URL = 'https://29.javascript.pages.academy/kekstagram';

const Way = {
  GET: '/data',
  POST: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = async (way, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${URL}${way}`, {method, body});
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch {
    throw new Error(errorText);
  }
};

const getData = () => load(Way.GET, ErrorText.GET);

const sendData = (body) => load(Way.POST, ErrorText.POST, Method.POST, body);

const data = await getData();

export {getData, sendData, data};

