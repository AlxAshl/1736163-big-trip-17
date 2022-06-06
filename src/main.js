import FilterView from './view/filter-view.js';
import {render} from './framework/render.js';
import FormPresenter from './presenter/form-presenter.js';
import {PointModel} from './model/forms-model.js';
import {generateFilter} from './mock/filter.js';

const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointModel;
const formPresenter = new FormPresenter(siteTripEventsSectionElement, pointsModel);
const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), siteTripControlsElement);

formPresenter.init();
/*
*/
