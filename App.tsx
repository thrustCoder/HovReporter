import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DriverCheck from './views/DriverCheck';
import TimeCheck from './views/TimeCheck';
import OccupancyCheck from './views/OccupancyCheck';
import LicenseCheck from './views/LicenseCheck';
import HighwayCheck from './views/HighwayCheck';
import DolForm from './views/DolForm';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appStateReducer from './state/reducers/AppReducer';

const Stack = createStackNavigator();
const store = createStore(appStateReducer);

export default function App({ navigation }) {
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="DriverCheck"
            component={DriverCheck}
          />
          <Stack.Screen
            name="TimeCheck"
            component={TimeCheck}
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
            name="DolForm" 
            component={DolForm} 
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
