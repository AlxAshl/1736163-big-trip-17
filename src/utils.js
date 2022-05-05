import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeEventDate = (dateFrom) => dayjs(dateFrom).format('D MMM');
const humanizeDate = (dateFrom) => dayjs(dateFrom).format('DD/MM/YY HH:MM');
const humanizeEventTime = (dateFrom) => dayjs(dateFrom).format('HH:mm');
export {getRandomInteger, humanizeEventDate, humanizeEventTime, humanizeDate};
