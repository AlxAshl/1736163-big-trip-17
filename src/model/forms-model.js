import {generatePoint, generateDestination, OFFERS} from '../mock/task';

export class PointModel {
  #points = Array.from({length: 10}, generatePoint);
  #offers = OFFERS;

  get points () {
    return this.#points;
  }

  get offers () {
    return this.#offers;
  }
}
export class DestinationModel {
  #destinations = Array.from({length: 4}, generateDestination);

  get destinations () {
    return this.#destinations;
  }
}

