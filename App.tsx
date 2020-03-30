import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TimeCheck from './views/TimeCheck';
import DriverCheck from './views/DriverCheck';
import LicensePlate from './views/LicensePlate';
import HighwayPicker from './views/HighwayPicker';
import DolForm from './views/DolForm';

const Stack = createStackNavigator();

export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TimeCheck"
          component={TimeCheck}
        />
        <Stack.Screen
          name="DriverCheck"
          component={DriverCheck}
        />
        <Stack.Screen
          name="LicensePlate"
          component={LicensePlate}
        />
        <Stack.Screen
          name="HighwayPicker"
          component={HighwayPicker}
        />
        <Stack.Screen 
          name="DolForm" 
          component={DolForm} 
        />
      </Stack.Navigator>
    </NavigationContainer>  
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
