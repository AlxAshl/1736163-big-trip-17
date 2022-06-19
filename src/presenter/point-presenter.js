import {render, replace, remove} from '../framework/render.js';
import Waypoint from '../view/point-view.js';
import EditForm from '../view/edit-point-view.js';
import {UserAction, UpdateType} from '../const.js';

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

  init = (point, offer, destinations) => {

    this.#point = point;
    this.#offer = offer;
    this.#destination = destinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditForm;

    this.#pointComponent = new Waypoint(point, offer, destinations);
    this.#pointEditForm = new EditForm(point, offer, destinations);

    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointComponent.setRollupClickHandler(this.#handlePointRollupClick);
    this.#pointEditForm.setRollupClickHandler(this.#handleFormRollupClick);
    this.#pointEditForm.setSubmitClickHandler(this.#handleSubmitClick);
    this.#pointEditForm.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditForm);
  };

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditForm.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditForm.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditForm.reset(this.#point);
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
      this.#pointEditForm.reset(this.#point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handlePointRollupClick = () => {
    this.#replacePointToForm();
  };

  #handleFormRollupClick = () => {
    this.#pointEditForm.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleSubmitClick = (point) => {
    // потребуется разделение на "тяжесть" апдейта(7.1.6)
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,//patch?
      point
    );
    this.#changeData(point);// дописать бейспрайс + дата + город (см 8.2.3)
  };

  #handleDeleteClick = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  setAborting = () => {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditForm.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditForm.shake(resetFormState);
  };
}
