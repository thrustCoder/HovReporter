import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearAllState } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { clearAllStateFn } from "../state/providers/ui-actions/Navigation";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class DriverBlackhole extends Component {
    componentDidMount() {
        logPageViewEvent(viewNames.DriverBlackhole);
    }

    render() {
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
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Image style={contentItems.noTextWhileDriveImage} 
                                source={require('../images/text-while-drive.png')} 
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h2 style={contentItems.mainText}>
                                Please focus on driving.
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                You can always come back and report the violation later.
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={boundingLayout.footer}>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    clearAllState,
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(DriverBlackhole);
