import {createElement} from '../render.js';

const createFormTemplate = () => '<ul class="trip-events__list"></ul>';

export default class FormView {

  #element = null;

  get template() {
    return createFormTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
