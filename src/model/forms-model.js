import {generatePoint, generateDestination} from '../mock/task';

export class PointModel {
  points = Array.from({length: 5}, generatePoint);

  getPoints = () => this.points;
}

export class DestinationModel {
  destinations = Array.from({length: 4}, generateDestination);

  getDestinations = () => this.destinations;
}
