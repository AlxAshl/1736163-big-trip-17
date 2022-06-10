import SortView from '../view/sort-view.js';
// import {updateItem} from '../utils/common.js'; второй коммит
import FormView from '../view/form-view.js';
import {render, RenderPosition, remove} from '../framework/render.js';
import PointPresenter from './point-presenter';
import NoPointView from '../view/no-points-view';
import {sortPriceUp, sortDayUp, sortTimeUp} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';

export default class FormPresenter {

  #formComponent = new FormView();
  //#sortComponent = new SortView(); КОММИТ 5
  #noPointComponent = null;
  #formContainer = null;
  #pointsModel = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #sortComponent = null;
  #filterModel = null;
  // #sourcedFormPoints = []; второй коммит
  // #formPoints = []; второй коммит
  // #formOffers = [];
  // #formDestinations = [];
  #pointPresenter = new Map();


  constructor (formContainer, pointsModel, filterModel) {
    this.#formContainer = formContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);//COMMIT 3
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredTasks = filter[this.#filterType](points);

    switch (this.#currentSortType) { // ВТОРОЙ КОММИТ (добавлен весь свич)
      case SortType.PRICE:
        return filteredTasks.sort(sortPriceUp);
      case SortType.DAY:
        return filteredTasks.sort(sortDayUp);
      case SortType.TIME:
        return filteredTasks.sort(sortTimeUp);
    }

    return filteredTasks; // ДОБАВЛЕНО, возможно потребуется get offers/dest-s  первый коммит

  }

  get offers() {
    return this.#pointsModel.offers;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  // #handlePointChange = (updatedPoint) => { //3й коммит полностью вырубает этот хэндлер
  // //  this.#formPoints = updateItem(this.#formPoints, updatedPoint); ВТОРОЙ КОММИТ
  //   this.#pointPresenter.get(updatedPoint.id).init(updatedPoint, this.offers, this.destinations); //this.#formOffers, this.#formDestinations
  // //  this.#sourcedFormPoints = updateItem(this.#sourcedFormPoints, updatedPoint); ВТОРОЙ КОММИТ
  // };

  #handleViewAction = (actionType, updateType, update) => { //COMMIT 3
    //console.log(actionType, updateType, update);
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #renderPoint = (point, offer, destinations) => {
    const pointPresenter = new PointPresenter(this.#formComponent.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point, offer, destinations);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #handleModelEvent = (updateType, data) => { //COMMIT 3 (понять куда передавать теперь .init(updatedPoint, this.offers, this.destinations) вроде работает и так, вай?!)
    //console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenter.get(data.id).init(data, this.offers, this.destinations); //СМ 26 СТРОКУ СМ ПОЙНТПРЕЗЕНТЕР И ДУМАЙ ЧЕ НЕ ТАК :)
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearForm(); //COMMIT 5
        this.#renderForm();// COMMIT 5
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearForm({resetSortType: true});// COMMIT 5
        this.#renderForm();// COMMIT 5
        break;
    }
  };

  #clearForm = ({resetSortType = false} = {}) => {
    //const taskCount = this.tasks.length; хз нужно ли это вообще

    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
    }

    //this.#renderedTaskCount = Math.min(taskCount, this.#renderedTaskCount);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  };

  // #clearPointList = () => { КОММИТ 6- полное удаление
  //   this.#pointPresenter.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenter.clear();
  // };


  #renderSort = () => {
    //render(this.#sortComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN); COMMIT 5
    this.#sortComponent = new SortView(this.#currentSortType); //COMMIT 5
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN); //commit 5
  };

  // #sortPoints = (sortType) => { ВТОРОЙ КОММИТ
  //   switch (sortType) {
  //     case SortType.PRICE:
  //       this.#formPoints.sort(sortPriceUp);
  //       break;
  //     case SortType.DAY:
  //       this.#formPoints.sort(sortDayUp);
  //       break;
  //     case SortType.TIME:
  //       this.#formPoints.sort(sortTimeUp);
  //       break;
  //     default:
  //       this.#formPoints = [...this.#sourcedFormPoints];
  //   }

  //   this.#currentSortType = sortType;
  // };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    //this.#sortPoints(sortType); ВТОРОЙ КОММИТ
    this.#currentSortType = sortType;
    this.#clearForm();// COMMIT 5
    this.#renderForm();// COMMIT 5
  };

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  init = () => {
    // this.#formPoints = [...this.#pointsModel.points]; //COMMIT 2
    //this.#formOffers = [...this.#pointsModel.offers]; // ПОДУМАТЬ, СТОИТ ЛИ ПЕРЕДЕЛЫВАТЬ, ИЗ КОММИТА 2
    //this.#formDestinations = [...this.#pointsModel.destinations];
    // this.#sourcedFormPoints = [...this.#pointsModel.points];// COMMIT 2
    this.#renderForm();
  };

  // #renderPoints = (from, to) => {
  //   this.#formPoints
  //     .slice(from, to)
  //     .forEach((point) => this.#renderPoint(point, this.#formOffers, this.#formDestinations));
  // };

  #renderPoints = (points) => { // КОММИТ 2
    points.forEach((point) => this.#renderPoint(point, this.offers, this.destinations));
  };

  #renderNoPoints = () => {
    this.#noPointComponent = new NoPointView(this.#filterType);
    render(this.#noPointComponent, this.#formComponent.element, RenderPosition.AFTERBEGIN);
  };

  // #renderPointList = () => { КОММИТ 6- полное удаление
  // //  this.#renderPoints(0, this.#formPoints.length); COMMIT 2
  //   const points = this.points; // В ДОКЕ ТАК: const tasks = this.tasks.slice(0, Math.min(taskCount, TASK_COUNT_PER_STEP));
  //   this.#renderPoints(points);// COMMIT 2
  // };

  #renderForm = () => {
    const points = this.points;//КОММИТ 5
    const pointsCount = points.length;//КОММИТ 5

    render(this.#formComponent, this.#formContainer);

    if (pointsCount === 0) { // добавить условия при различных фильтрах (ТЗ 1.6) // ПОКА ТУТ НИЧЕГО НЕ МЕНЯЛ НО В КОММИТЕ 2 были изменения, но мне их возможно не следует
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    //render(this.#formComponent, this.#formComponent.element);//КОММИТ 5 !!!!!!!!!!!!!!!БЕЗ НЕГО РАБОТАЕТ НО В ДЗ ОН ЕСТЬ, НЕ ПОНЯЛ ПОКА ЧТО ЭТО возможно это как раз та обертка
    this.#renderPoints(points.slice(0, pointsCount));//КОММИТ 5
    // this.#renderPointList(); //КОММИТ 5
  };
}
