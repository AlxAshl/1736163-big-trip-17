const FilterType = {
  FUTURE: 'Future',
  EVERYTHING: 'Everything',
  PAST: 'Past',
};

const SortType = {
  DAY: 'Day',
  TIME: 'Time',
  PRICE: 'Price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const createPictures = (object) => {
  if(object.name) {
    return  object.pictures.map((picture) => (
      `<img class="event__photo" src="${picture.src}" alt="Event photo"></img>`)
    ).join('');

  }

  return '';
};

export {FilterType, SortType, UserAction, UpdateType, Method, createPictures};
