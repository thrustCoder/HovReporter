import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { getNextStepFn, clearAllStateFn } from "../state/providers/ui-actions/Navigation";
import viewNames from '../state/ViewNames';
import { updateOccupants, clearAllState } from '../state/actions/AppActions';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class OccupancyCheck extends Component {
    state = {
        button1Color: colors.darkGray,
        button2Color: colors.darkGray
    };

    updateOccupants(numberOfOccupants) {
        if (numberOfOccupants === 1) {
            this.state.button1Color = colors.green;
            this.state.button2Color = colors.darkGray;
        } else {
            this.state.button2Color = colors.green;
            this.state.button1Color = colors.darkGray;
        }

        this.props.updateOccupants(numberOfOccupants);
        this.props.navigation.navigate(getNextStepFn(this.props, viewNames.OccupancyCheck));
    }

    isSkipBtnDisabled() {
        return getNextStepFn(this.props, viewNames.OccupancyCheck) === viewNames.DolPreCheck;
    }

    componentDidMount() {
        logPageViewEvent(viewNames.OccupancyCheck);
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
                            <Icon
                                name='torsos-female-male'
                                type='foundation'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                How many people do you see in the vehicle?
                            </Text>
                        </View>
                        <View style={boundingLayout.actionAreaSmall}>
                            <Button style={contentItems.mainButtonPrimary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: this.state.button1Color }}
                                    title="1" 
                                    onPress={() => this.updateOccupants(1)} 
                            />
                            <Button style={contentItems.mainButtonSecondary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: this.state.button2Color }}
                                    title="2" 
                                    onPress={() => this.updateOccupants(2)} 
                            />
                        </View>
                    </View>
                </View>
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
                    <View style={contentItems.skipButton}>
                        <Icon
                            name='debug-step-over'
                            type='material-community'
                            color={this.isSkipBtnDisabled() ? colors.darkGray : colors.green}
                            size={boundingLayout.footerSkipBtn.height}
                            disabled={this.isSkipBtnDisabled()}
                            disabledStyle={{ backgroundColor: colors.white }}
                            onPress={() => this.props.navigation.navigate(getNextStepFn(this.props, viewNames.OccupancyCheck))}
                        />
                    </View>
                    <View style={contentItems.nextButtonFiller}>
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateOccupants,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(OccupancyCheck);
