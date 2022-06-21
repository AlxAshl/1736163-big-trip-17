import {UserAction, UpdateType} from '../const.js';
import {remove, render, RenderPosition} from '../framework/render.js';
import CreateForm from '../view/create-point-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class NewPointPresenter {
  #pointContainer = null;
  #pointEditComponent = null;
  #destroyCallback = null;
  #changeData = null;
  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeData) {
    this.#pointContainer = pointContainer;
    this.#changeData = changeData;
  }

  init = (callback, offer, destinations) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new CreateForm(undefined, offer, destinations);
    this.#pointEditComponent.setSubmitClickHandler(this.#handleSubmitClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  setSaving = () => {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleSubmitClick = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  };
}
