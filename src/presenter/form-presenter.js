import SortView from '../view/sort-view.js';
import CreateForm from '../view/create-point-view.js';
import EditForm from '../view/edit-point-view.js';
import Waypoint from '../view/point-view.js';
import FormView from '../view/form-view.js';
import {render} from '../render.js';

export default class FormPresenter {

  formComponent = new FormView();

  init = (formContainer, pointsModel, destinationModel) => {
    this.formContainer = formContainer;
    this.pointsModel = pointsModel;
    this.destinationModel = destinationModel;
    this.formPoints = [...this.pointsModel.getPoints()];
    this.formDestinations = [...this.destinationModel.getDestinations()];
    render(this.formComponent, this.formContainer);
    render(new SortView(), this.formComponent.getElement());
    render(new EditForm(this.formPoints[0]), this.formComponent.getElement());
    render(new CreateForm(this.formPoints[1]), this.formComponent.getElement());


    for(let i = 2; i < this.formPoints.length; i++) {
      render(new Waypoint(this.formPoints[i]), this.formComponent.getElement());
    }
  };
}
