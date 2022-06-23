import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, currentFilterType) => {

  const {
    type,
    name,
    count
  } = filter;

  return (
    ` <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''} value="${type}">
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label><span class="filter__${name}-count trip-filters__filter-label"> ${count}</span></label
        >
      </div>`
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return `<section class="main__filter filter container">
    ${filterItemsTemplate}
  </section>`;
};

export default class FilterView  extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
