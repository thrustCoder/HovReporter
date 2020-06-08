import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from './views/Start';
import DriverCheck from './views/DriverCheck';
import DriverBlackhole from './views/DriverBlackhole';
import TimeCheck from './views/TimeCheck';
import TimeSetPast from './views/TimeSetPast';
import OccupancyCheck from './views/OccupancyCheck';
import LicenseCheck from './views/LicenseCheck';
import HighwayCheck from './views/HighwayCheck';
import DolPreCheck from './views/DolPreCheck';
import DolPreLaunch from './views/DolPreLaunch';
import DolForm from './views/DolForm';
import FinalSuccess from './views/FinalSuccess';

import CommentsCheck from './views/optional/CommentsCheck';
import DolPreCheckComments from './views/optional/DolPreCheckComments';
import VehicleDetailsCheck from './views/optional/VehicleDetailsCheck';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appStateReducer from './state/reducers/AppReducer';
import viewNames from './state/ViewNames';

const Stack = createStackNavigator();
const store = createStore(appStateReducer);

export default function App({ navigation }) {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name={viewNames.Start}
            component={Start}
          />
          <Stack.Screen
            name={viewNames.DriverCheck}
            component={DriverCheck}
          />
          <Stack.Screen
            name={viewNames.DriverBlackhole}
            component={DriverBlackhole}
          />
          <Stack.Screen
            name={viewNames.LicenseCheck}
            component={LicenseCheck}
          />
          <Stack.Screen
            name={viewNames.TimeCheck}
            component={TimeCheck}
          />
          <Stack.Screen
            name={viewNames.TimeSetPast}
            component={TimeSetPast}
          />
          <Stack.Screen
            name={viewNames.OccupancyCheck}
            component={OccupancyCheck}
          />
          <Stack.Screen
            name={viewNames.HighwayCheck}
            component={HighwayCheck}
          />
          <Stack.Screen
            name={viewNames.VehicleDetailsCheck}
            component={VehicleDetailsCheck}
          />
          <Stack.Screen
            name={viewNames.DolPreCheck}
            component={DolPreCheck}
          />
          <Stack.Screen
            name={viewNames.DolPreCheckComments}
            component={DolPreCheckComments}
          />
          <Stack.Screen
            name={viewNames.CommentsCheck}
            component={CommentsCheck}
          />
          <Stack.Screen
            name={viewNames.DolPreLaunch}
            component={DolPreLaunch}
          />
          <Stack.Screen 
            name={viewNames.DolForm}
            component={DolForm} 
          />
          <Stack.Screen 
            name={viewNames.FinalSuccess}
            component={FinalSuccess} 
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}
