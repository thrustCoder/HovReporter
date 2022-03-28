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
        name: 'I-5NB',
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
};

const appStateReducer = (state = initialAppState, action) => {
  let {
    dolForm
  } = state;

  switch (action.type) {
    case appActions.ClearAllState:
        dolForm.license = {
          plate: '',
          state: 'WA'
        };
        dolForm.highway = {
          name: '',
          isRamp: false
        };
        dolForm.location = '';
        dolForm.time = {
          hour: '',
          minute: '',
          amPm: ''
        };
        dolForm.date = {
          day: '',
          month: '',
          year: ''
        };
        dolForm.occupants = '1';
        dolForm.vehicle = {
          make: '',
          model: '',
          color: ''
        };
        dolForm.comments = '';
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

  return reducedState;
};

export default combineReducers({
  appState: appStateReducer,
  navState: navStateReducer
});
