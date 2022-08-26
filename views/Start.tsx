import React, {Component, useState} from 'react';
import { View } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';

import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';
import * as Location from 'expo-location';

class Start extends Component {
    
    componentDidMount() {
        logPageViewEvent(viewNames.Start);
    }

    async sendCurrentLocationToServer() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }
        const newLocation = await Location.getCurrentPositionAsync({});

        if (newLocation && newLocation.coords && newLocation.coords.latitude && newLocation.coords.longitude)
        {
            // Make POST request
            fetch('https://hovreporter.azurewebsites.net/locationdetails', {
                        method: 'POST',
                        body: JSON.stringify({
                            'Lat': newLocation.coords.latitude,
                            'Long': newLocation.coords.longitude
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((responseJson) => {
                        console.log(responseJson);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
        }
        else
        {
            console.error("Location call did not yield valid results.");
        }

        this.props.navigation.navigate(viewNames.FinalSuccess);
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Image 
                                style={contentItems.startMainImage} 
                                source={require('../images/hov-sign.png')} 
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Saw an HOV lane violation?
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                Let's report it to the Department of Transportation. It's easy!
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Image 
                                style={contentItems.startReportImage}
                                source={require('../images/easy.png')} 
                                testID={"Report"}
                                onPress={() => this.sendCurrentLocationToServer()}
                            />
                        </View>
                    </View>
                </View>
                <View style={boundingLayout.footerVersion}>
                    <Text style={contentItems.versionText}>
                        App version:
                    </Text>
                    <Text 
                        style={contentItems.versionText}
                        data-i9n-redact={true}>
                        v3.0.1
                    </Text>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(Start);
