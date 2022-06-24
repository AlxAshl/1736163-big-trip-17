import {FilterType} from '../const';

const currentDate = new Date();
const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom.getTime() >= currentDate.getTime() || (point.dateFrom.getTime() < currentDate.getTime() && currentDate.getTime() < point.dateTo.getTime())),
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo.getTime() < currentDate.getTime() || (point.dateFrom.getTime() < currentDate.getTime() && currentDate.getTime() < point.dateTo.getTime())),
};

export {filter};

