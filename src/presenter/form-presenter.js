import SortView from '../view/sort-view.js';
import {updateItem} from '../utils/common.js';
import FormView from '../view/form-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter';


export default class FormPresenter {

  #formComponent = new FormView();
  #sortComponent = new SortView();

  #formContainer = null;
  #pointsModel = null;

  #formPoints = [];
  #formOffers = [];
  #pointPresenter = new Map();

  #renderPoint = (point, offer) => {
    const pointPresenter = new PointPresenter(this.#formComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offer);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint, offer) => {
    this.#formPoints = updateItem(this.#formPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, offer);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  constructor (formContainer, pointsModel) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
  }

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  init = () => {
    this.#formPoints = [...this.#pointsModel.points];
    this.#formOffers = [...this.#pointsModel.offers];
    this.#renderForm();
  };

  #renderPoints = (from, to) => {
    this.#formPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point, this.#formOffers));
  };

  #renderPointList = () => {
    this.#renderPoints(0, this.#formPoints.length);
  };

  #renderForm = () => {
    render(this.#formComponent, this.#formContainer);
    this.#renderSort();
    this.#renderPointList();
  };
}
