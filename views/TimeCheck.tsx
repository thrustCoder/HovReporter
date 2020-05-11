import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { updateDate, updateTime, updateDateTime, clearAllState } from '../state/actions/AppActions';
import { getNextStepFn, clearAllStateFn } from "../state/providers/ui-actions/Navigation";
import viewNames from "../state/ViewNames";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class TimeCheck extends Component {
    mapCurrentTimeToState() {
        let currentDateTime = new Date();
        let hour = currentDateTime.getHours() % 12;
        let minute = currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5);
        let amPm = (currentDateTime.getHours() >= 12) ? 'pm' : 'am';
        let time = {
            hour,
            minute,
            amPm
        };
        let date = {
            month: (currentDateTime.getMonth() + 1),
            day: currentDateTime.getDate(),
            year: currentDateTime.getFullYear()
        };
    
        this.props.updateTime(time);
        this.props.updateDate(date);
        this.props.updateDateTime();
        
        this.props.navigation.navigate(getNextStepFn(this.props, viewNames.TimeCheck));
    }

    isSkipBtnDisabled() {
        return getNextStepFn(this.props, viewNames.TimeCheck) === viewNames.DolPreCheck;
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
                                name='watch'
                                type='octicon'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Did you notice the HOV violation just now (within past 15 minutes)?
                            </Text>
                        </View>
                        <View style={boundingLayout.actionAreaSmall}>
                            <Button style={contentItems.mainButtonPrimary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="Yes" 
                                    onPress={() => this.mapCurrentTimeToState()} 
                            />
                            <Button style={contentItems.mainButtonSecondary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="No" 
                                    onPress={() => this.props.navigation.navigate(viewNames.TimeSetPast)} 
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
                            onPress={() => this.props.navigation.navigate(getNextStepFn(this.props, viewNames.TimeCheck))}
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
    updateDate,
    updateTime,
    updateDateTime,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(TimeCheck);
