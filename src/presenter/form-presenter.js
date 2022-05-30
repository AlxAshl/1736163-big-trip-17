import SortView from '../view/sort-view.js';
import {updateItem} from '../utils/common.js';
import FormView from '../view/form-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter';
import NoPointView from '../view/no-points-view';

export default class FormPresenter {

  #formComponent = new FormView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #formContainer = null;
  #pointsModel = null;

  #formPoints = [];
  #formOffers = [];
  #formDestinations = [];
  #pointPresenter = new Map();

  #renderPoint = (point, offer, destinations) => {//NEW destination
    const pointPresenter = new PointPresenter(this.#formComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offer, destinations);//NEW destination
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {//убрал второй аргумент offer
    this.#formPoints = updateItem(this.#formPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#formOffers);//который был тут
    // this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#formDestinations);// NEW добавил на всякий случай - точно не работает!
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
    this.#formDestinations = [...this.#pointsModel.destinations];
    this.#renderForm();
  };

  #renderPoints = (from, to) => {
    this.#formPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point, this.#formOffers));
  };

  #renderNoPoints = () => {
    render(this.#noPointComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderPointList = () => {
    this.#renderPoints(0, this.#formPoints.length);
  };

  #renderForm = () => {
    render(this.#formComponent, this.#formContainer);

    if (this.#formPoints.length === 0) { // добавить условия при различных фильтрах (ТЗ 1.6)
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  };
}
