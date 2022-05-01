import {createElement} from '../render.js';

const createFormTemplate = () => '<ul class="trip-events__list"></ul>';

export default class FormView {
  getTemplate() {
    return createFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
