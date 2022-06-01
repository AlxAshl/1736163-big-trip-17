import {render, replace, remove} from '../framework/render.js';
import Waypoint from '../view/point-view.js';
import EditForm from '../view/edit-point-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointComponent = null;
  #pointEditForm = null;
  #pointContainer = null;

  #point = null;
  #offer = null;
  #destination = null;

  #changeMode = null;
  #changeData = null;
  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeData, changeMode) {

    this.#pointContainer = pointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, offer, destinations) => {//NEW destinations

    this.#point = point;
    this.#offer = offer;
    this.#destination = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditForm;

    this.#pointComponent = new Waypoint(point, offer, destinations);//NEW DESTINATION
    this.#pointEditForm = new EditForm(point, offer, destinations);//NEW DESTINATION

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointComponent.setRollupClickHandler(this.#handlePointRollupClick);
    this.#pointEditForm.setRollupClickHandler(this.#handleFormRollupClick);
    this.#pointEditForm.setSubmitClickHandler(this.#handleSubmitClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditForm, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditForm);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditForm.reset(this.#point);//---------------------
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditForm, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditForm.reset(this.#point);//--------------------
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handlePointRollupClick = () => {
    this.#replacePointToForm();
  };

  #handleFormRollupClick = () => {
    this.#replaceFormToPoint();
  };

  #handleSubmitClick = (point, offer, destinations) => {
    this.#replaceFormToPoint();
    this.#changeData(point, offer, destinations);
  };

  #handleFavoriteClick = (...offer) => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite}, offer[1]);
  };
}
