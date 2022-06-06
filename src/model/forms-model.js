import {generatePoint, OFFERS, DESTINATIONS} from '../mock/task';

export class PointModel {
  #points = Array.from({length: 10}, generatePoint);
  #offers = OFFERS;
  #destinations = DESTINATIONS;

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }

  get destinations () {
    return this.#destinations;
  }
}

