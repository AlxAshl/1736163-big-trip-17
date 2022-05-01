import SortView from '../view/sort-view.js';
import CreateForm from '../view/create-point-view.js';
import EditForm from '../view/edit-point-view.js';
import Waypoint from '../view/point-view.js';
import FormView from '../view/form-view.js';
import {render} from '../render.js';

export default class FormPresenter {

  formComponent = new FormView();

  init = (formContainer) => {
    this.formContainer = formContainer;

    render(this.formComponent, this.formContainer);
    render(new SortView(), this.formComponent.getElement());
    render(new EditForm(), this.formComponent.getElement());
    render(new CreateForm(), this.formComponent.getElement());


    for(let i = 0; i < 3; i++) {
      render(new Waypoint(), this.formComponent.getElement());
    }
  };
}
