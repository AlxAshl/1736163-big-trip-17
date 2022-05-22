import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant'
];

const CITIES = [
  'Amsterdam',
  'Copenhagen',
  'Bernex',
  'Monaco',
  'Toulouse',
  'Hamburg'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Aliquam erat volutpat.'
];

export const OFFERS = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Guide',
        price: 60
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Better car',
        price: 120
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: 60
      }
    ]
  },
  {
    type: 'Flight',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Add meal',
        price: 60
      }
    ]
  },
  {
    type: 'Check-in',
    offers: [
      {
        id: 1,
        title: 'Luggage transportation',
        price: 120
      }
    ]
  },
  {
    type: 'Sightseeing',
    offers: [
      {
        id: 1,
        title: 'Taxi pickup',
        price: 120
      }
    ]
  },
  {
    type: 'Restaurant',
    offers: [
      {
        id: 1,
        title: 'Better view',
        price: 20
      }
    ]
  },
];

const getValue = (value) => value[getRandomInteger(0,value.length -1)];
const getType = () => getRandomInteger(0, 8);
const getBool = () => getRandomInteger(0, 1);

export const generateDestination = () => ({
  description: getValue(DESCRIPTIONS),
  name: getValue(CITIES),
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
      description: getValue(DESCRIPTIONS)
    }
  ]
});

export const generatePoint = () => ({
  getValue,
  basePrice: getRandomInteger(50, 2000),
  dateFrom: '2019-07-10T11:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: generateDestination(),
  id: nanoid(),
  isFavorite: getBool(),
  offers: [1, 2],
  type: TYPES[getType()],
});

