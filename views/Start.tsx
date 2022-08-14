import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
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
                                onPress={() => this.props.navigation.navigate(viewNames.FinalSuccess)}
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
                        v2.1.1
                    </Text>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(Start);
