import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Start from './views/Start';
import FinalSuccess from './views/FinalSuccess';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appStateReducer from './state/reducers/AppReducer';
import viewNames from './state/ViewNames';

import * as Amplitude from 'expo-analytics-amplitude';
import { getAmplitudeApEyeKee } from './state/providers/config/AmplitudeKey';

const Stack = createStackNavigator();
const store = createStore(appStateReducer);
if (typeof navigator != 'undefined' && navigator.product == 'ReactNative') {
  Amplitude.initializeAsync(getAmplitudeApEyeKee());
}

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
            name={viewNames.FinalSuccess}
            component={FinalSuccess} 
          />
        </Stack.Navigator>
      </NavigationContainer>  
    </Provider>
  );
}
