import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything"  ${isChecked ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label><span class="filter__${name}-count trip-filters__filter-label"> ${count}</span></label
        >
      </div>`
  );
};

const createFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<section class="main__filter filter container">
    ${filterItemsTemplate}
  </section>`;
};

export default class FilterView  extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
