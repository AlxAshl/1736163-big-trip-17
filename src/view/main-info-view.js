import AbstractView from '../framework/view/abstract-view.js';
import {humanizeEventDate} from '../utils/point.js';

const createMainInfoTemplate = (points, offers) => {

  const createOfferPrice = () => {
    let sum = 0;
    points.forEach((point) => {
      const allOffers = offers
        .find((selectedOffer) => selectedOffer.type === point.type);
      allOffers.offers.map((offer) => {
        if (point.offers.includes(offer.id)) {
          sum += offer.price;
        }
      });
    });
    return sum;
  };

  const createDestinationsInfo = () => {
    if (points.length === 0){
      return ('');
    }
    else if (points.length === 1){
      return (`${points[0].destination.name}`);
    }
    else if (points.length === 3){
      return (`${points[0].destination.name} &mdash; ${points[1].destination.name} &mdash; ${points[2].destination.name}`);
    }
    else{
      return (`${points[0].destination.name} &mdash; ${points[points.length -1].destination.name} `);
    }
  };

  const createDateInfo = () => {
    if (points.length === 0){
      return ('');
    }
    else if (points.length === 1){
      return (`${humanizeEventDate(points.dateFrom)}`);
    }
    else{
      return (`${humanizeEventDate(points[0].dateFrom)} &mdash; ${humanizeEventDate(points[points.length -1].dateTo)}`);
    }
  };

  const createBasePrice = () => {
    let sum = 0;
    points.forEach((point) => {
      sum += point.basePrice;
    });
    return sum;
  };

  return (
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${createDestinationsInfo()}</h1>
          <p class="trip-info__dates">${createDateInfo()}</p>
        </div>
          <p class="trip-info__cost">
            Total: &euro;&nbsp;<span class="trip-info__cost-value">${createBasePrice() + createOfferPrice()}</span>
          </p>
      </section>`
  );
};

export default class MainInfoView  extends AbstractView {

  #point = null;
  #offer = null;
  #destination = null;

  constructor(points, offers, destinations) {
    super();
    this.#point = points;
    this.#offer = offers;
    this.#destination = destinations;
  }

  get template() {
    return createMainInfoTemplate(this.#point, this.#offer, this.#destination);
  }
}
