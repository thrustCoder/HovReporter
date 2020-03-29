import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  let injectedJavaScript = `document.getElementById('edit-submitted-license').value = 'BEE4547'; ` +
                           `document.getElementById('edit-submitted-state').value = 'AL'; ` +
                           `document.getElementById('edit-submitted-highway-ferry-terminal').value = 'SR-16WB'; ` +
                           `document.getElementById('edit-submitted-location').value = 'Driving on the highway HOV lane'`;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: "https://www.wsdot.wa.gov/travel/highways-bridges/hov/report-violator" }} 
               javaScriptEnabled={true} 
               injectedJavaScript={injectedJavaScript}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  }
});
