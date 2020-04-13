import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

class DolForm extends Component {
    private webView;
    private injectedJavaScript2 = `window.ReactNativeWebView.postMessage(JSON.stringify({type: "PostNavigate", payload: window.location.href})); `;

    onPostMessage(eventData) {
        let data = JSON.parse(eventData);

        if ((data.type === "PostNavigate") && (RegExp('^https://www.wsdot.wa.gov/node/[0-9]+/done').test(data.payload.split()[0]))) {
            console.log("Huzzzahhh!");
            this.props.navigation.navigate('FinalSuccess');
        } else {
            console.log("Huhhhuuuu!");
            this.props.navigation.navigate('FinalSuccess');

            // DOIT: uncomment when final
            // let that = this;
            // setTimeout(function() { that.webView.injectJavaScript(that.injectedJavaScript2) }, 5000);
        }
    }

    render() {
        let form = this.props.appState.dolForm;
        console.log(form);

        let subjectWord = (form.occupants > 1) ? 'people' : 'person';
        let location = `Saw ${form.occupants} ${subjectWord} in a vehicle on HOV lane.`;
        let observedOnRampSelectorIndex = form.highway.isRamp ? 1 : 2;
        let injectedJavaScript = 
          `document.getElementById('edit-submitted-license').value = "${form.license.plate}"; ` +
          `document.getElementById('edit-submitted-state').value = "${form.license.state}"; ` +
          `document.getElementById('edit-submitted-highway-ferry-terminal').value = "${form.highway.name}"; ` +
          `document.getElementById('edit-submitted-observed-on-ramp-${observedOnRampSelectorIndex}').click(); ` +
          `document.getElementById('edit-submitted-location').value = "${location}"; ` +
          `document.getElementById('edit-submitted-occupants').value = "${form.occupants}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-hour').value = "${form.time.hour}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-minute').value = "${form.time.minute}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-ampm-${form.time.amPm}').checked = "true"; ` +
          `document.getElementsByClassName('g-recaptcha')[0].style.transform = "scale(2.4)"; ` +
          `document.getElementsByClassName('g-recaptcha')[0].style["margin"] = "100px auto 100px 310px"; ` +
          `document.getElementsByClassName('form-submit')[0].style.transform = "scale(3.5)"; ` +
          `document.getElementsByClassName('form-submit')[0].style["margin"] = "50px auto 100px 300px"; ` +
          `document.getElementsByClassName('form-submit')[0].scrollIntoView(); ` +
          `document.getElementsByClassName('webform-submit button-primary form-submit')[0].onclick = ` + 
            `function() { window.ReactNativeWebView.postMessage(JSON.stringify({type: "SubmitButtonClick", payload: window.location.href})); }; `;
        
        if (form.vehicle) {
          if (form.vehicle.make) {
            injectedJavaScript = `${injectedJavaScript} document.getElementById('edit-submitted-make').value = "${form.vehicle.make}"; `; 
          }
          if (form.vehicle.model) {
            injectedJavaScript = `${injectedJavaScript} document.getElementById('edit-submitted-model').value = "${form.vehicle.model}"; `; 
          }
          if (form.vehicle.color) {
            injectedJavaScript = `${injectedJavaScript} document.getElementById('edit-submitted-color').value = "${form.vehicle.color}"; `; 
          }
        }

        return (
          <View style={styles.container}>
            <WebView ref={webView => (this.webView = webView)}
                    source={{ uri: "https://www.wsdot.wa.gov/travel/highways-bridges/hov/report-violator" }} 
                    javaScriptEnabled={true} 
                    injectedJavaScript={injectedJavaScript}
                    onMessage={(event) => this.onPostMessage(event.nativeEvent.data)}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});

const mapStateToProps = (state) => {
  const { appState } = state
  return { appState }
};

export default connect(mapStateToProps)(DolForm);
