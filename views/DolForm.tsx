import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

class DolForm extends Component {
    render() {
        let form = this.props.appState.dolForm;
        console.log(form);
        console.log(form.license.plate);
        console.log(form.license.state);

        let subjectWord = (form.occupants > 1) ? 'people' : 'person';
        let location = `Saw ${form.occupants} ${subjectWord} in a vehicle on HOV lane.`;
        let injectedJavaScript = 
          `document.getElementById('edit-submitted-license').value = "${form.license.plate}"; ` +
          `document.getElementById('edit-submitted-state').value = "${form.license.state}"; ` +
          `document.getElementById('edit-submitted-highway-ferry-terminal').value = "${form.highway}"; ` +
          `document.getElementById('edit-submitted-location').value = "${location}"; ` +
          `document.getElementById('edit-submitted-occupants').value = "${form.occupants}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-hour').value = "${form.time.hour}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-minute').value = "${form.time.minute}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-ampm-${form.time.amPm}').checked = "true"; ` +
          `document.getElementsByClassName('g-recaptcha')[0].style.transform = "scale(2.4)"; ` +
          `document.getElementsByClassName('g-recaptcha')[0].style["margin"] = "100px auto 100px 310px"; ` +
          `document.getElementsByClassName('form-submit')[0].style.transform = "scale(3.5)"; ` +
          `document.getElementsByClassName('form-submit')[0].style["margin"] = "50px auto 100px 300px"; ` +
          `document.getElementsByClassName('form-submit')[0].scrollIntoView(); `;

        return (
          <View style={styles.container}>
            <WebView source={{ uri: "https://www.wsdot.wa.gov/travel/highways-bridges/hov/report-violator" }} 
                    javaScriptEnabled={true} 
                    injectedJavaScript={injectedJavaScript}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    }
});

const mapStateToProps = (state) => {
  const { appState } = state
  return { appState }
};

export default connect(mapStateToProps)(DolForm);
