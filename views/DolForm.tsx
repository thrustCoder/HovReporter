import React, {Component} from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { clearAllState } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { clearAllStateFn } from "../state/providers/ui-actions/Navigation";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class DolForm extends Component {
    private pingForSuccessCount = 0;
    private webView;
    private injectedJavaScript2 = `window.ReactNativeWebView.postMessage(JSON.stringify({type: "PostNavigate", payload: window.location.href})); `;

    onPostMessage(eventData) {
      console.log("Inside onPostMessage: " + eventData);
      let data = JSON.parse(eventData);

        // A/B: Local testing
        // if ((data.type === "PostNavigate") && (RegExp('^https://www.wsdot.wa.gov/node/[0-9]+/done').test(data.payload.split()[0]))) {
        //     console.log("Success!");
        //     this.props.navigation.navigate(viewNames.FinalSuccess);
        // } else {
        //   console.log("Short circuit success!");
        //   this.props.navigation.navigate(viewNames.FinalSuccess);
        // }

        // A/B: Prod version
        if ((data.type === "PostNavigate") && 
            (RegExp('^https://wsdot.wa.gov/node/[0-9]+/done').test(data.payload.split()[0]))) {

            console.log("Success!");
            this.props.navigation.navigate(viewNames.FinalSuccess);
        } else {
            let that = this;
            if (this.pingForSuccessCount < 15) {
              this.pingForSuccessCount++;
              setTimeout(function() {
                if (that.webView) {
                    that.webView.injectJavaScript(that.injectedJavaScript2) 
                }
              }, 5000);
            }
        }
    }

    componentDidMount() {
      logPageViewEvent(viewNames.DolForm);
    }

    render() {
        let form = this.props.appState.dolForm;
        console.log(form);

        let observedOnRampSelectorIndex = form.highway.isRamp ? 1 : 2;
        let injectedJavaScript = 
          `document.getElementById('edit-submitted-license').value = "${form.license.plate}"; ` +
          `document.getElementById('edit-submitted-state').value = "${form.license.state}"; ` +
          `document.getElementById('edit-submitted-highway-ferry-terminal').value = "${form.highway.name}"; ` +
          `document.getElementById('edit-submitted-observed-on-ramp-${observedOnRampSelectorIndex}').click(); ` +
          `document.getElementById('edit-submitted-location').value = "${form.location}"; ` +
          `document.getElementById('edit-submitted-occupants').value = "${form.occupants}"; ` +
          `document.getElementById('edit-submitted-date-month').value = "${form.date.month}"; ` +
          `document.getElementById('edit-submitted-date-day').value = "${form.date.day}"; ` +
          `document.getElementById('edit-submitted-date-year').value = "${form.date.year}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-hour').value = "${form.time.hour}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-minute').value = "${form.time.minute}"; ` +
          `document.getElementById('edit-submitted-time-of-violation-ampm-${form.time.amPm}').checked = "true"; ` +
          `let captchaEl = document.getElementsByClassName('g-recaptcha')[0]; ` +
          `captchaEl.style.transform = "scale(2)"; ` +
          `captchaEl.style["margin"] = "100px 0 100px 270px"; ` +
          `let submitBtnEl = document.getElementsByClassName('form-submit')[0]; ` +
          `submitBtnEl.style.transform = "scale(3)"; ` +
          `submitBtnEl.style["margin"] = "50px auto 100px 270px"; ` +
          `submitBtnEl.scrollIntoView(); ` +
          `submitBtnEl.onclick = ` + 
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

        if (form.comments) {
          injectedJavaScript = `${injectedJavaScript} document.getElementById('edit-submitted-comments').value = "${form.comments}"; `;
        }

        if (typeof document != 'undefined') {
          // I'm on the web!
          return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.mainArea}>
                          <pre>{JSON.stringify(form, null, 2)}</pre>
                        </View>
                    </View>
                </View>
                <View style={boundingLayout.footer}>
                    <View style={contentItems.skipButton}>
                        <Icon
                            name='debug-step-over'
                            type='material-community'
                            color={colors.green}
                            size={boundingLayout.footerNavigationBtn.height}
                            onPress={() => this.props.navigation.navigate(viewNames.FinalSuccess)}
                            data-i9n-btn={"DolForm.Skip"}
                        />
                    </View>
                </View>
            </View>
          );
        }
        else {
          // I'm in react-native
          return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.header}>
                    <View style={contentItems.cancelButton}>
                        <Icon
                            name='times-circle'
                            type='font-awesome'
                            color={colors.red}
                            size={50}
                            onPress={() => clearAllStateFn(this.props)}
                        />
                    </View>       
                </View>
                <WebView 
                    ref={webView => (this.webView = webView)}
                    source={{ uri: "https://www.wsdot.wa.gov/travel/highways-bridges/hov/report-violator" }} 
                    javaScriptEnabled={true} 
                    injectedJavaScript={injectedJavaScript}
                    onMessage={(event) => this.onPostMessage(event.nativeEvent.data)}
                />
                <View style={boundingLayout.footer}>
                    <View style={contentItems.backButton}>
                        <Icon
                            name='arrow-circle-left'
                            type='font-awesome'
                            color={colors.green}
                            size={boundingLayout.footerNavigationBtn.height}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </View>
            </View>
          );
        }
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(DolForm);
