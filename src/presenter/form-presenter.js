import SortView from '../view/sort-view.js';
import FormView from '../view/form-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter';
import NoPointView from '../view/no-points-view';
import {sortPriceUp, sortDayUp, sortTimeUp} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class FormPresenter {

  #formComponent = new FormView();
  #loadingComponent = new LoadingView();
  #noPointComponent = null;
  #formContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #sortComponent = null;
  #filterModel = null;
  #pointNewPresenter = null;
  #pointPresenter = new Map();
  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);


  constructor (formContainer, pointsModel, filterModel, offersModel, destinationsModel) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#pointNewPresenter = new NewPointPresenter(this.#formComponent.element, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredTasks = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredTasks.sort(sortPriceUp);
      case SortType.DAY:
        return filteredTasks.sort(sortDayUp);
      case SortType.TIME:
        return filteredTasks.sort(sortTimeUp);
    }

    return filteredTasks;

  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  #handleViewAction = async (actionType, updateType, update) => {

    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }

        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }

        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }

        break;
    }

    this.#uiBlocker.unblock();
  };

  #renderPoint = (point, offer, destinations) => {
    const pointPresenter = new PointPresenter(this.#formComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offer, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handleModelEvent = (updateType, data) => {

    switch (updateType) {
      case UpdateType.  PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data, this.offers, this.destinations);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearForm();
        this.#renderForm();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearForm({resetSortType: true});
        this.#renderForm();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderForm();
        break;
    }
  };

  #clearForm = ({resetSortType = false} = {}) => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearForm();
    this.#renderForm();
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  init = () => {
    this.#renderForm();
  };


  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point, this.offers, this.destinations));
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(callback, this.offers, this.destinations);
  };

  #renderForm = () => {

    render(this.#formComponent, this.#formContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointsCount = points.length;

    render(this.#formComponent, this.#formContainer);

    if (pointsCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPoints(points.slice(0, pointsCount));
  };
}
