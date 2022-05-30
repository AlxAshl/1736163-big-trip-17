import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const CITIES = [
  'Amsterdam',
  'Geneva',
  'Chamonix'
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
    type: 'flight',
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
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Luggage transportation',
        price: 120
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Taxi pickup',
        price: 120
      }
    ]
  },
  {
    type: 'restaurant',
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

export const DESTINATIONS = [
  {
    description: getValue(DESCRIPTIONS),
    name: 'Amsterdam',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
    ]
  },
  {
    description: getValue(DESCRIPTIONS),
    name: 'Geneva',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
    ]
  },
  {
    description: getValue(DESCRIPTIONS),
    name: 'Chamonix',
    pictures: [
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
      {
        src: `http://picsum.photos/248/152?r=${getRandomInteger(1,10)}`,
        description: getValue(DESCRIPTIONS)
      },
    ]
  },
];

export const generatePoint = () => ({
  getValue,
  basePrice: getRandomInteger(50, 2000),
  dateFrom: '2019-07-10T11:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  destination: getValue(DESTINATIONS),//NEW changed from generateDestination() / getValue(DESTINATIONS)
  id: nanoid(),
  isFavorite: getBool(),
  offers: [1,2],
  type: TYPES[getType()],
  destName: getValue(CITIES)//NEW FIELD
});

