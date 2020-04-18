import React from 'react';
import { StyleSheet } from 'react-native';
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

const Stack = createStackNavigator();
const store = createStore(appStateReducer);

export default function App({ navigation }) {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="Start"
            component={Start}
          />
          <Stack.Screen
            name="DriverCheck"
            component={DriverCheck}
          />
          <Stack.Screen
            name="DriverBlackhole"
            component={DriverBlackhole}
          />
          <Stack.Screen
            name="TimeCheck"
            component={TimeCheck}
          />
          <Stack.Screen
            name="TimeSetPast"
            component={TimeSetPast}
          />
          <Stack.Screen
            name="OccupancyCheck"
            component={OccupancyCheck}
          />
          <Stack.Screen
            name="LicenseCheck"
            component={LicenseCheck}
          />
          <Stack.Screen
            name="HighwayCheck"
            component={HighwayCheck}
          />
          <Stack.Screen
            name="VehicleDetailsCheck"
            component={VehicleDetailsCheck}
          />
          <Stack.Screen
            name="DolPreCheck"
            component={DolPreCheck}
          />
          <Stack.Screen
            name="DolPreCheckComments"
            component={DolPreCheckComments}
          />
          <Stack.Screen
            name="CommentsCheck"
            component={CommentsCheck}
          />
          <Stack.Screen
            name="DolPreLaunch"
            component={DolPreLaunch}
          />
          <Stack.Screen 
            name="DolForm" 
            component={DolForm} 
          />
          <Stack.Screen 
            name="FinalSuccess" 
            component={FinalSuccess} 
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
