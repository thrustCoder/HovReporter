import { combineReducers } from 'redux';
import viewNames from '../ViewNames';
import { appActions } from '../actions/AppActions';

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
  navSequence: [
    viewNames.TimeCheck, 
    viewNames.OccupancyCheck, 
    viewNames.LicenseCheck, 
    viewNames.HighwayCheck
  ],
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
    appProps: ['highway', 'location']
  }
};

const appStateReducer = (state = initialAppState, action) => {
  let {
    dolForm
  } = state;

  switch (action.type) {
    case appActions.TimeUpdate:
        dolForm.time = action.payload;
        break;
    case appActions.DateUpdate:
        dolForm.date = action.payload;
        break;
    case appActions.OccupantsUpdate:
        dolForm.occupants = action.payload;
        break;
    case appActions.LicenseUpdate:
        dolForm.license = action.payload;
        break;
    case appActions.HighwayUpdate:
        dolForm.highway = action.payload;
        break;
    case appActions.LocationUpdate:
        dolForm.location = action.payload;
        break;
    case appActions.VehicleUpdate:
        dolForm.vehicle = action.payload;
        break;
    case appActions.CommentsUpdate:
        dolForm.comments = action.payload;
        break;
    case appActions.ClearAllState:
        dolForm = initialAppState.dolForm;
        break;
    default:
        return state;
  }

  return {
    dolForm
  };
};

const navStateReducer = (state = initialNavState, action) => {
  let reducedState = state;

  switch (action.type) {
    case appActions.DateTimeUpdate:
        reducedState.TimeCheck.completed = true;
        break;
    case appActions.OccupantsUpdate:
        reducedState.OccupancyCheck.completed = true;
        break;
    case appActions.LicenseUpdate:
        reducedState.LicenseCheck.completed = true;
        break;
    case appActions.HighwayUpdate:
        reducedState.HighwayCheck.completed = true;
        break;
    case appActions.ClearAllState:
        reducedState.TimeCheck.completed = false;
        reducedState.OccupancyCheck.completed = false;
        reducedState.LicenseCheck.completed = false;
        reducedState.HighwayCheck.completed = false;
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
