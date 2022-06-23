import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class OfferApiService extends ApiService {
  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  updatePoint = async (offer) => {
    const response = await this._load({
      url: `offers/${offer.id}`,
      method: Method.PUT,
      body: JSON.stringify(offer),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };
}
