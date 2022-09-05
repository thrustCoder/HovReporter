import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearAllState } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { clearAllStateFn } from "../state/providers/ui-actions/Navigation";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class FinalSuccess extends Component {
    componentDidMount() {
        logPageViewEvent(viewNames.FinalSuccess);
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Icon
                                name='check-circle'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h2 style={contentItems.mainText}>
                                DONE!
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                We will report the location of violation to WA State Patrol.
                            </Text>
                            <Text style={contentItems.mainText}>
                                You can go back home by pressing 'Done'.
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButtonSecondaryLong} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    testID={"FinalSuccess.BackToStart"}
                                    title="Done" 
                                    onPress={() => clearAllStateFn(this.props)}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(FinalSuccess);
