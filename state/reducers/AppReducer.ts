import { combineReducers } from 'redux';

const initialState = {
  dolForm: {
      license: {
        plate: '',
        state: 'WA'
      },
      highway: '',
      location: '',
      time: {
        hour: '',
        minute: '',
        amPm: ''
      },
      occupants: '1',
      vehicle: {
        make: '',
        model: '',
        color: ''
      }
  }
};

const appStateReducer = (state = initialState, action) => {
  const {
    dolForm
  } = state;

  switch (action.type) {
    case 'TimeUpdate':
        dolForm.time = action.payload;
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
    default:
        return state;
  }

  return {
    dolForm
  };
};

export default combineReducers({
  appState: appStateReducer,
});
