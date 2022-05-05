import FilterView from './view/filter-view.js';
import {render} from './render.js';
import FormPresenter from './presenter/form-presenter.js';
import {PointModel, DestinationModel} from './model/forms-model.js';

const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsSectionElement = document.querySelector('.trip-events');
const formPresenter = new FormPresenter;
const pointsModel = new PointModel;
const destinationModel = new DestinationModel;

render(new FilterView(), siteTripControlsElement);

formPresenter.init(siteTripEventsSectionElement, pointsModel, destinationModel);
