import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import {humanizeDate} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEditFormTemplate = (point, offersList, destinations) => {

  const {
    basePrice,
    dateFrom,
    dateTo,
    type,
    destination,
    offers,
    isDisabled,
    isSaving,
    isDeleting
  } = point;

  const startTime = humanizeDate(dateFrom);
  const finishTime = humanizeDate(dateTo);
  const pointDestinations = destinations;

  const pointTypeOffer = offersList
    .find((selectedOffer) => selectedOffer.type === point.type);
  const createOffers = () =>
    pointTypeOffer.offers.map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked = true' : '';
      return `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="${offer.title.replace(/ /ig, '-')}" ${checked} ${isDisabled ? 'disabled' : ''}>
                <label class="event__offer-label" for="${offer.id}">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`;
    }).join('');

  const createPictures = function() {
    if(destination.name) {
      return  destination.pictures.map((picture) => (
        `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`)
      ).join('');

    }
    else {
      return '';
    }
  };

  const createDestinations = () =>
    pointDestinations.map((destinationOption) => (
      `<option value="${destinationOption.name}"></option>`)
    ).join('');

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group" ${isDisabled ? 'disabled' : ''}>
                <legend class="visually-hidden">Event type</legend>

                <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                </div>

                <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                </div>
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" required  ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${createDestinations()}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}" ${isDisabled ? 'disabled' : ''} autocomplete="off">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishTime}" ${isDisabled ? 'disabled' : ''} autocomplete="off">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit"> ${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset">${isDeleting ? 'Deleting...' : 'Delete'}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${createOffers()}
          </section>

          <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>


          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPictures()}

            </div>
      </form>
    </li>`
  );
};

export default class EditForm extends AbstractStatefulView {
  #datepicker = null;
  #offer = null;
  #destination = null;

  constructor(point, offer, destinations) {
    super();
    this._state = EditForm.parsePointToState(point);
    this.#offer = offer;
    this.#destination = destinations;

    this.#setInnerHandlers();
    this.#setFromDatepicker();
    this.#setToDatepicker();
  }

  get template() {
    return createEditFormTemplate(this._state, this.#offer, this.#destination);
  }

  setSubmitClickHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  reset = (point) => {
    this.updateElement(
      EditForm.parsePointToState(point)
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setSubmitClickHandler(this._callback.formSubmit);
    this.setRollupClickHandler(this._callback.rollupClick);
    this.#setFromDatepicker();
    this.#setToDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(EditForm.parseStateToPoint(this._state, this.#offer, this.#destination));
  };

  setRollupClickHandler = (callback) => {
    this._callback.rollupClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollupClick();
  };

  #typeSelectHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #offerSelectHandler = (evt) => {
    evt.preventDefault();
    const theNewState = [];
    const allCheckboxes = Array.from(document.querySelectorAll('.event__offer-checkbox'));
    allCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        theNewState.push(Number(checkbox.id));
      }
    });
    this.updateElement({
      offers: theNewState
    });
  };

  #destinationSelectHandler = (evt) => {
    evt.preventDefault();
    const newDestinationPoint = {};
    newDestinationPoint.name = evt.target.value;
    const newObject = this.#destination
      .find((dest) => dest.name === newDestinationPoint.name);
    this.updateElement({
      destination: {
        name: newObject.name,
        description: newObject.description,
        pictures: newObject.pictures
      }
    });
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationSelectHandler);
    this.element.querySelector('.event__type-group')
      .addEventListener('input', this.#typeSelectHandler);
    this.element.querySelector('.event__available-offers')
      .addEventListener('change', this.#offerSelectHandler);
    this.element.querySelector('#event-price-1')
      .addEventListener('change', this.#offerPriceHandler);
  };

  static parsePointToState = (point) => ({...point,
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseStateToPoint = (state) => {
    const editForm = {...state};
    delete editForm.newDestinationPoint;
    delete editForm.newState;
    delete editForm.isDisabled;
    delete editForm.isSaving;
    delete editForm.isDeleting;
    return editForm;
  };

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #offerPriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value)
    });
  };

  #setFromDatepicker = () => {
    if (this._state) {
      this.#datepicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          maxDate: this._state.dateTo,
          dateFormat: 'j/m/y H:i',
          allowInput: true,
          enableTime: true,
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler,
        },
      );
    }
  };

  #setToDatepicker = () => {
    if (this._state) {
      this.#datepicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          minDate: this._state.dateFrom,
          dateFormat: 'j/m/y H:i',
          allowInput: true,
          enableTime: true,
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler,
        },
      );
    }
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(EditForm.parseStateToPoint(this._state));
  };
}

