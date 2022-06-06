//Задание 4.2
import {FilterType} from '../const';
import {humanizeDate} from '../utils/point.js';

const x = new Date();
const filter = {
  [FilterType.FUTURE]: (points) => points.filter((point) => humanizeDate(point.dateFrom) > humanizeDate(x)),
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.PAST]: (points) => points.filter((point) => humanizeDate(point.dateTo) < humanizeDate(x)),
};

export {filter};
