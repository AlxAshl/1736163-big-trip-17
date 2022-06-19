import AbstractView from '../framework/view/abstract-view.js';

const createFormTemplate = () => '<ul class="trip-events__list"></ul>';

export default class FormView extends AbstractView {

  get template() {
    return createFormTemplate();
  }
}
