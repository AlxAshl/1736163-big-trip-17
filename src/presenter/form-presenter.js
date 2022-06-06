import SortView from '../view/sort-view.js';
import {updateItem} from '../utils/common.js';
import FormView from '../view/form-view.js';
import {render, RenderPosition} from '../framework/render.js';
import PointPresenter from './point-presenter';
import NoPointView from '../view/no-points-view';
import {sortPriceUp, sortDayUp, sortTimeUp} from '../utils/point.js';//new
import {SortType} from '../const.js';//new

export default class FormPresenter {

  #formComponent = new FormView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();
  #formContainer = null;
  #pointsModel = null;
  #currentSortType = SortType.DAY;
  #sourcedFormPoints = [];
  #formPoints = [];
  #formOffers = [];
  #formDestinations = [];
  #pointPresenter = new Map();

  #renderPoint = (point, offer, destinations) => {
    const pointPresenter = new PointPresenter(this.#formComponent.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point, offer, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#formPoints = updateItem(this.#formPoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.#formOffers);
    this.#sourcedFormPoints = updateItem(this.#sourcedFormPoints, updatedPoint);/// NEW
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  constructor (formContainer, pointsModel) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
  }

  // console.log(sortType)

  #sortPoints = (sortType) => {//new
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве formPoints
    switch (sortType) {
      case SortType.PRICE:
        this.#formPoints.sort(sortPriceUp);
        break;
      case SortType.DAY:
        this.#formPoints.sort(sortDayUp);
        break;
      case SortType.TIME:
        this.#formPoints.sort(sortTimeUp);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _formPoints исходный массив
        this.#formPoints = [...this.#sourcedFormPoints];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => { //
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();

  };

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
    this.#sourcedFormPoints = [...this.#pointsModel.points];
    this.#renderForm();
  };

  #renderPoints = (from, to) => {
    this.#formPoints
      .slice(from, to)
      .forEach((point) => this.#renderPoint(point, this.#formOffers, this.#formDestinations));
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
