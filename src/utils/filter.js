import {FilterType} from '../const';
import {humanizeDate} from '../utils/point.js';

const currentDate = new Date();
const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => humanizeDate(point.dateFrom) > humanizeDate(currentDate)),
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => humanizeDate(point.dateTo) < humanizeDate(currentDate)),
};

export {filter};
