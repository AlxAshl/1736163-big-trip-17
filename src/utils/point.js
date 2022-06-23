import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const humanizeEventDate = (dateFrom) => dayjs(dateFrom).format('D MMM');
const humanizeDate = (dateFrom) => dayjs(dateFrom).format('DD/MM/YY HH:MM');
const humanizeEventTime = (dateFrom) => dayjs(dateFrom).format('HH:mm');

const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

const sortPriceUp = (pointB, pointA) => {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);

  return weight ?? getDifference(pointA.basePrice, pointB.basePrice);
};

const sortDayUp = (pointB, pointA) => {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
};

const sortTimeUp = (pointB, pointA) => {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? getDifference (dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)), dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)));
};

function getDifference(a, b) {

  return a - b;
}
export {getRandomInteger, humanizeEventDate, humanizeEventTime, humanizeDate, sortPriceUp, sortTimeUp, sortDayUp};

