import MainInfoView from '../view/main-info-view';
import {render, replace, remove, RenderPosition} from '../framework/render.js';
import {sortDayUp} from '../utils/point.js';

export default class MainInfoPresenter{
  #mainInfoContainer = null;
  #pointsModel = null;
  #mainInfoComponent = null;
  #destinationsModel = null;
  #offersModel = null;


  constructor(mainInfoContainer, pointsModel, offersModel, destinationsModel) {
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#mainInfoContainer = mainInfoContainer;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points.sort(sortDayUp);
    return points;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  init = () => {
    const points = this.points;
    const offers = this.offers;
    const destinations = this.destinations;
    const prevMainInfoComponent = this.#mainInfoComponent;
    this.#mainInfoComponent = new MainInfoView(points, offers, destinations);
    render(this.#mainInfoComponent, this.#mainInfoContainer );

    if (prevMainInfoComponent === null) {
      render(this.#mainInfoComponent, this.#mainInfoContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this.#mainInfoComponent, prevMainInfoComponent, RenderPosition.AFTERBEGIN);
    remove(prevMainInfoComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
