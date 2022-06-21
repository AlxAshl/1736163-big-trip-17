import FormPresenter from './presenter/form-presenter.js';
import {PointModel, OfferModel, DestinationModel} from './model/forms-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainInfoPresenter from './presenter/main-info-presenter.js';
import PointApiService from './services/point-api-service';
import DestinationApiService from './services/destination-api-service.js';
import OfferApiService from './services/offer-api-service.js';

const AUTHORIZATION = 'Basic mS2sf744w8l1sa2j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const filterModel = new FilterModel();
const siteTripControlsElement = document.querySelector('.trip-main');
const siteTripEventsSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointModel(new PointApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationModel(new DestinationApiService(END_POINT, AUTHORIZATION));
const offersModel = new OfferModel(new OfferApiService(END_POINT, AUTHORIZATION));
const formPresenter = new FormPresenter(siteTripEventsSectionElement, pointsModel, filterModel, offersModel, destinationsModel);
const newEventButton = document.querySelector('.trip-main__event-add-btn');
newEventButton.disabled = true;
const mainInfoPresenter = new MainInfoPresenter(siteTripControlsElement, pointsModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);

const handleNewPointFormClose = () => {
  newEventButton.disabled = false;
};

const handleNewEventButtonClick = () => {
  formPresenter.createPoint(handleNewPointFormClose);
  newEventButton.disabled = true;
};

newEventButton.addEventListener('click', handleNewEventButtonClick);
destinationsModel.init();
offersModel.init()
  .finally(() => {
    pointsModel.init()
      .then(newEventButton.disabled = false);
  });
formPresenter.init();
mainInfoPresenter.init();
filterPresenter.init();

