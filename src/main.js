import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import FormPresenter from './presenter/form-presenter.js';
import PointModel from './model/forms-model.js';
//import {generateFilter} from './mock/filter.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filterModel = new FilterModel();
const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointModel;
const formPresenter = new FormPresenter(siteTripEventsSectionElement, pointsModel, filterModel);
//const filters = generateFilter(pointsModel.points);

const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);

//render(new FilterView(filters), siteTripControlsElement);
//render(new FilterView(filters, 'all'), siteTripControlsElement);
formPresenter.init();
filterPresenter.init();
/*
*/
