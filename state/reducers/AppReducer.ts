import { combineReducers } from 'redux';

const initialAppState = {
  dolForm: {
      license: {
        plate: '',
        state: 'WA'
      },
      highway: {
        name: '',
        isRamp: false
      },
      location: '',
      time: {
        hour: '',
        minute: '',
        amPm: ''
      },
      date: {
        day: '',
        month: '',
        year: ''
      },
      occupants: '1',
      vehicle: {
        make: '',
        model: '',
        color: ''
      },
      comments: ''
  }
};

const initialNavState = {
  navSequence: ['TimeCheck', 'OccupancyCheck', 'LicenseCheck', 'HighwayCheck'],
  TimeCheck: {
    completed: false,
    appProps: ['date', 'time']
  },
  OccupancyCheck: {
    completed: false,
    appProps: ['occupants']
  },
  LicenseCheck: {
    completed: false,
    appProps: ['license']
  },
  HighwayCheck: {
    completed: false,
    appProps: ['highway']
  }
};

const appStateReducer = (state = initialAppState, action) => {
  const {
    dolForm
  } = state;

  switch (action.type) {
    case 'TimeUpdate':
        dolForm.time = action.payload;
        break;
    case 'DateUpdate':
        dolForm.date = action.payload;
        break;
    case 'OccupantsUpdate':
        dolForm.occupants = action.payload;
        break;
    case 'LicenseUpdate':
        dolForm.license = action.payload;
        break;
    case 'HighwayUpdate':
        dolForm.highway = action.payload;
        break;
    case 'VehicleUpdate':
        dolForm.vehicle = action.payload;
        break;
    case 'CommentsUpdate':
        dolForm.comments = action.payload;
        break;
    default:
        return state;
  }

  return {
    dolForm
  };
};

const navStateReducer = (state = initialNavState, action) => {
  const reducedState = state;

  switch (action.type) {
    case 'DateTimeUpdate':
        reducedState.TimeCheck.completed = true;
        break;
    case 'OccupantsUpdate':
        reducedState.OccupancyCheck.completed = true;
        break;
    case 'LicenseUpdate':
        reducedState.LicenseCheck.completed = true;
        break;
    case 'HighwayUpdate':
        reducedState.HighwayCheck.completed = true;
        break;
    default:
        return state;
  }

  return reducedState;
};

export default combineReducers({
  appState: appStateReducer,
  navState: navStateReducer
});
