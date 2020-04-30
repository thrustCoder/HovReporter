import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate, updateTime, updateDateTime, clearAllState } from '../state/actions/AppActions';

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
        
        this.props.navigation.navigate(this.getNextStep());
    }

    getNextStep() {
        let currentNavIndex = this.props.navState.navSequence.lastIndexOf('TimeCheck');
        let i = currentNavIndex;
        let nextState;

        do {
            i = (i + 1) % 4;
            nextState = this.props.navState[this.props.navState.navSequence[i]];
        } while (nextState.completed === true && this.props.navState.navSequence[i] !== 'TimeCheck');

        if (this.props.navState.navSequence[i] === 'TimeCheck') {
            return 'DolPreCheck';
        }

        return this.props.navState.navSequence[i];
    }

    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    isSkipBtnDisabled() {
        return this.getNextStep() === 'DolPreCheck';
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
                            onPress={() => this.clearAllState()}
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
                                Did you notice the HOV violation just now (or within past 15 minutes)?
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
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
                                    onPress={() => this.props.navigation.navigate('TimeSetPast')} 
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
                            size={70}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <View style={contentItems.skipButton}>
                        <Icon
                            name='debug-step-over'
                            type='material-community'
                            color={this.isSkipBtnDisabled() ? colors.darkGray : colors.green}
                            size={85}
                            disabled={this.isSkipBtnDisabled()}
                            disabledStyle={{ backgroundColor: 'aqua' }}
                            onPress={() => this.props.navigation.navigate(this.getNextStep())}
                        />
                    </View>
                    <View style={contentItems.nextButtonFiller}>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateDate,
        updateTime,
        updateDateTime,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimeCheck);
