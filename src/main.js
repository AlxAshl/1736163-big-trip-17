// import FilterView from './view/filter-view.js';
// import {render} from './framework/render.js';
import FormPresenter from './presenter/form-presenter.js';
import {PointModel, OfferModel, DestinationModel} from './model/forms-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointApiService from './services/point-api-service';
import DestinationApiService from './services/destination-api-service.js';
import OfferApiService from './services/offer-api-service.js';

const AUTHORIZATION = 'Basic mS2sf744w8l1sa2j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip';

const filterModel = new FilterModel();
const siteTripControlsElement = document.querySelector('.trip-controls__filters');
const siteTripEventsSectionElement = document.querySelector('.trip-events');
const pointsModel = new PointModel(new PointApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationModel(new DestinationApiService(END_POINT, AUTHORIZATION));
const offersModel = new OfferModel(new OfferApiService(END_POINT, AUTHORIZATION));
const formPresenter = new FormPresenter(siteTripEventsSectionElement, pointsModel, filterModel, offersModel, destinationsModel);// сюда передать еще две модели
const newEventButton = document.querySelector('.trip-main__event-add-btn');
newEventButton.disabled = true;
const filterPresenter = new FilterPresenter(siteTripControlsElement, filterModel, pointsModel);

const handleNewPointFormClose = () => {
  newEventButton.disabled = false;
};

const handleNewEventButtonClick = () => {
  formPresenter.createPoint(handleNewPointFormClose);
  newEventButton.disabled = true;
};

newEventButton.addEventListener('click', handleNewEventButtonClick);

// offersModel.init();
console.log('offers', offersModel);
destinationsModel.init();
console.log('dests', destinationsModel);
formPresenter.init(); // выводит пустое поле(заглушку)
// опробовать организовать инициализацию только после подгрузок всех моделей, типа функция = асинк () => {
//   const destinationsModel =await new DestinationModel(new DestinationApiService(END_POINT, AUTHORIZATION));
//   const offersModel =await new OfferModel(new OfferApiService(END_POINT, AUTHORIZATION));
// }
// pointsModel.init();
console.log('points', pointsModel);
filterPresenter.init();
offersModel.init()
  .finally(() => {
    pointsModel.init()
      .then(newEventButton.disabled = false);
  });

// console.log(offersModel)
