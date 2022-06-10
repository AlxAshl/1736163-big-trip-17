import {generatePoint, OFFERS, DESTINATIONS} from '../mock/task';
import Observable from '../framework/observable.js';

export  default class PointModel extends Observable {
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

  updatePoint = (updateType, update) => { //ПРИ ОБНОВЕ ЗВЕЗДОЧКИ МЫ ПОПАДЕМ СЮДА и тут все будет обновляться, разобраться с офером тут
    const index = this.#points.findIndex((point) => point.id === update.id);// COMMIT 3

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}

