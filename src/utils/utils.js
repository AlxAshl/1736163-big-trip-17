import dayjs from 'dayjs';

const humanizeEventDate = (dateFrom) => dayjs(dateFrom).format('D MMM');
const humanizeDate = (dateFrom) => dayjs(dateFrom).format('DD/MM/YYY HH:MM');
const humanizeEventTime = (dateFrom) => dayjs(dateFrom).format('HH:mm');

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
export {humanizeEventDate, humanizeEventTime, humanizeDate, randomDate};
