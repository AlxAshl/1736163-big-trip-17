import {getRandomInteger} from '../utils.js';

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

const OFFERS = [
  {
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
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Get a snack',
        price: 60
      }
    ]
  },
  {
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Add a meal',
        price: 60
      },
      {
        id: 3,
        title: 'Extra luggage',
        price: 60
      }
    ]
  },
  {
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120
      }, {
        id: 2,
        title: 'Extra luggage',
        price: 60
      },
      {
        id: 3,
        title: 'Pet pen',
        price: 60
      }
    ]
  },
];

const getValue = (value) => value[getRandomInteger(0,value.length -1)];
const getType = () => getRandomInteger(0, 3);
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
  id: 0,
  isFavorite: getBool(),
  type: TYPES[getType()],
  offers: OFFERS[getType()]
});

