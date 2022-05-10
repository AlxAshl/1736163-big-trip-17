import SortView from '../view/sort-view.js';
import EditForm from '../view/edit-point-view.js';
import Waypoint from '../view/point-view.js';
import FormView from '../view/form-view.js';
import {render} from '../render.js';

export default class FormPresenter {

  #formComponent = new FormView();
  #formContainer = null;
  #pointsModel = null;
  #formPoints = [];
  #formOffers = [];

  #renderPoint = (point, offer) => {
    const pointComponent = new Waypoint(point, offer);
    const pointEditForm = new EditForm (point, offer);

    const replacePointToForm = () => {
      this.#formComponent.element.replaceChild(pointEditForm.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this.#formComponent.element.replaceChild(pointComponent.element, pointEditForm.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditForm.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditForm.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormToPoint();
    });

    render(pointComponent, this.#formComponent.element);
  };

  init = (formContainer, pointsModel) => {

    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;

    this.#formPoints = [...this.#pointsModel.points];
    this.#formOffers = [...this.#pointsModel.offers];

    render(this.#formComponent, this.#formContainer);
    render(new SortView(), this.#formComponent.element);

    for(let i = 0; i < this.#formPoints.length; i++) {
      this.#renderPoint(this.#formPoints[i], this.#formOffers);
    }
  };
}
