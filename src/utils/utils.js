import dayjs from 'dayjs';

const humanizeEventDate = (dateFrom) => dayjs(dateFrom).format('D MMM');
const humanizeDate = (dateFrom) => dayjs(dateFrom).format('DD/MM/YYY HH:MM');
const humanizeEventTime = (dateFrom) => dayjs(dateFrom).format('HH:mm');

export {humanizeEventDate, humanizeEventTime, humanizeDate};
