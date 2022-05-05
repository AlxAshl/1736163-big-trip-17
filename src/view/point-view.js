import {createElement} from '../render.js';
import {humanizeEventDate, humanizeEventTime} from '../utils.js';
import dayjs from 'dayjs';

const createWaypoint = (task) => {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type, offers} = task;

  const date = dateFrom !== null
    ? humanizeEventDate(dateFrom)
    : '';
  const startTime = dateFrom !== null
    ? humanizeEventTime(dateFrom)
    : '';
  const finishTime = dateTo !== null
    ? humanizeEventTime(dateTo)
    : '';
  const addFavourite = isFavorite
    ? '--active'
    : '';
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  let minutes = date2.diff(date1, 'minutes');
  const hours = Math.floor(minutes/60);
  minutes = minutes - (hours * 60);

  const createOfferTemplate = () =>(
    `<li class="event__offer">
    <span class="event__offer-title">${offers.offers[1].title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offers.offers[1].price}</span>
  </li>`
  );

  return (
    `<li class = "trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${finishTime}</time>
          </p>
          <p class="event__duration">${hours}H${minutes}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${createOfferTemplate()}
        </ul>
        <button class="event__favorite-btn event__favorite-btn${addFavourite}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Waypoint {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createWaypoint(this.point);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
