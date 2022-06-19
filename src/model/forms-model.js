// import {generatePoint, OFFERS, DESTINATIONS} from '../mock/task';
import Observable from '../framework/observable.js';
import {UpdateType} from '../const.js';

export class PointModel extends Observable {
  #pointsApiService = null;
  #points = [];
  // #points = Array.from({length: 10}, generatePoint);
  // #offers = OFFERS;
  // #destinations = DESTINATIONS;

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;

    // this.#pointsApiService.points.then((points) => {
    //   console.log(points);
    //   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    //   // а ещё на сервере используется snake_case, а у нас camelCase.
    //   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    //   // Есть вариант получше - паттерн "Адаптер"
    //   console.log(points.map(this.#adaptToClient));
    // });
  }

  get points () {
    return this.#points;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
    } catch(err) {
      this.#points = [];
    }
    this._notify(UpdateType.INIT);
  };

  // get offers () {
  //   return this.#offers;
  // }

  // get destinations () {
  //   return this.#destinations;
  // }

  updatePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  };

  // addPoint = (updateType, update) => {
  //   this.#points = [
  //     update,
  //     ...this.#points,
  //   ];

  //   this._notify(updateType, update);
  // };

  addPoint = async (updateType, update) => {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  };

  deletePoint = async (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    // this.#points = [
    //   ...this.#points.slice(0, index),
    //   ...this.#points.slice(index + 1),
    // ];

    // this._notify(updateType);
    try {
      // Обратите внимание, метод удаления задачи на сервере
      // ничего не возвращает. Это и верно,
      // ведь что можно вернуть при удалении задачи?
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  };

  #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}
// добавить две модели
export class OfferModel extends Observable{

  #offers = [];
  #offersApiService = null;

  constructor(offersApiService) {
    super();
    this.#offersApiService = offersApiService;

    // this.#offersApiService.offers.then((offers) => {
    //   console.log(offers);
    //   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    //   // а ещё на сервере используется snake_case, а у нас camelCase.
    //   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    //   // Есть вариант получше - паттерн "Адаптер"
    // });
  }

  get offers() {
    return this.#offers;
  }

  init = async () => {
    try {
      const offers = await this.#offersApiService.offers;
      this.#offers = offers; // так?
      // console.log(this.#offers);
      //this.#offers = offers.map(this.#adaptToClient);
    } catch(err) {
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };
}

export class DestinationModel extends Observable{

  #destinations = [];
  #destinationsApiService = null;

  constructor(destinationsApiService) {
    super();
    this.#destinationsApiService = destinationsApiService;

    // this.#destinationsApiService.destinations.then((destinations) => {
    //   console.log(destinations);
    //   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    //   // а ещё на сервере используется snake_case, а у нас camelCase.
    //   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    //   // Есть вариант получше - паттерн "Адаптер"
    // });
  }


  get destinations() {
    return this.#destinations;
  }

  init = async () => {
    try {
      const destinations = await this.#destinationsApiService.destinations;
      this.#destinations = destinations; // так?
      //this.#offers = offers.map(this.#adaptToClient);
    } catch(err) {
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  };
}
