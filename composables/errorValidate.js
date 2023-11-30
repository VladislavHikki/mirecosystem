export default function errorValidate(status, text) {
  let message = text ? text : 'Что-то пошло не так.';
  let toastType = 'error';
  let summary = 'Уведомление';
  status = status.toString();
  if (status.startsWith('1')) {
    message = text ? text : 'Обработка';
    toastType = 'info';
  } else if (status.startsWith('2')) {
    message = text ? text : 'Успешно!';
    toastType = 'success';
    summary = 'ОК!';
  } else if (status.startsWith('3')) {
    message = text ? text : 'Перенаправление.';
    toastType = 'warn';
  } else if (status.startsWith('4')) {
    message = text ? text : 'Некорректный запрос!';
    summary = 'Ошибка';
  } else if (status.startsWith('5')) {
    message = text ? text : 'Ошибка на стороне сервера!';
    summary = 'Ошибка';
  }
  return { toastType, message, summary };
}
