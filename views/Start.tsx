import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateOccupants } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class Start extends Component {
    componentDidMount() {
        logPageViewEvent(viewNames.Start);
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Image style={contentItems.startMainImage} source={require('../images/hov-sign.png')} />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Saw someone using an HOV lane illegally?
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                Let's report the violation on Department of Transportation site. It's simple!
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButton} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    data-i9n-btn={"Report"}
                                    title="Let's report" 
                                    onPress={() => this.props.navigation.navigate(viewNames.DriverCheck)} 
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
                        v1.3.4
                    </Text>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateOccupants,
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(Start);
