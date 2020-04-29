import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate, updateTime, updateDateTime, clearAllState } from '../state/actions/AppActions';
import datetime from '../state/providers/ui-content/DateTime';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class TimeSetPast extends Component {
    state = {
        date: {
            day: '',
            month: '',
            year: ''    
        },
        time: {
            hour: '',
            minute: '',
            amPm: ''    
        },
        amPm: {
            amColor: colors.blue,
            pmColor: colors.blue
        }
    };

    updateDateTime() {
        let currentDateTime = new Date();
        this.props.updateDate({
            day: this.state.date.day || currentDateTime.getDate(),
            month: this.state.date.month || (currentDateTime.getMonth() + 1),
            year: this.state.date.year || currentDateTime.getFullYear()
        });
        this.props.updateTime({
            hour: this.state.time.hour || (currentDateTime.getHours() % 12),
            minute: this.state.time.minute || (currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5)),
            amPm: this.state.time.amPm || ((currentDateTime.getHours() >= 12) ? 'pm' : 'am')
        });

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

    onAmPmClick(amPmClicked) {
        if (amPmClicked === 'am') {
            this.state.amPm.amColor = colors.green;
            this.state.amPm.pmColor = colors.blue;
        } else {
            this.state.amPm.pmColor = colors.green;
            this.state.amPm.amColor = colors.blue;
        }

        this.setState({
            time: {
                hour: this.state.time.hour,
                minute: this.state.time.minute,
                amPm: amPmClicked   
            }
        });
    }

    render() {
        let currentDateTime = new Date();
        let currentMonth = `${this.state.date.month || (currentDateTime.getMonth() + 1)}`;
        let currentDay = `${this.state.date.day || currentDateTime.getDate()}`;
        let currentYear = `${this.state.date.year || currentDateTime.getFullYear()}`;
        let currentHour = `${this.state.time.hour || (currentDateTime.getHours() % 12 === 0 ? '12' : (currentDateTime.getHours() % 12))}`;
        let currentMinute = `${this.state.time.minute || (currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5))}`;

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
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Day:
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    value={currentDay}
                                    onValueChange={(day) => this.setState({
                                        date: {
                                            day,
                                            month: this.state.date.month,
                                            year: this.state.date.year
                                        }
                                    })}
                                    placeholder={{label: 'Select day', value: null}}
                                    items={datetime.dayPickerItems}
                                />
                                <Text h4 style={contentItems.pickerLabel}>
                                    Month:
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    value={currentMonth}
                                    onValueChange={(month) => this.setState({
                                        date: {
                                            day: this.state.date.day,
                                            month,
                                            year: this.state.date.year
                                        }
                                    })}
                                    placeholder={{label: 'Select month', value: null}}
                                    items={datetime.monthPickerItems}
                                />
                                <Text h4 style={contentItems.pickerLabel}>
                                    Year:
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    value={currentYear}
                                    onValueChange={(year) => this.setState({
                                        date: {
                                            day: this.state.date.day,
                                            month: this.state.date.month,
                                            year
                                        }
                                    })}
                                    placeholder={{label: 'Select year', value: null}}
                                    items={datetime.yearPickerItems}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Hour
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    value={currentHour}
                                    onValueChange={(hour) => this.setState({
                                        time: {
                                            hour,
                                            minute: this.state.time.minute,
                                            amPm: this.state.time.amPm    
                                        }
                                    })}
                                    placeholder={{label: 'Select hour', value: null}}
                                    items={datetime.hourPickerItems}
                                />
                                <Text h4 style={contentItems.pickerLabel}>
                                    Minute
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    value={currentMinute}
                                    onValueChange={(minute) => this.setState({
                                        time: {
                                            hour: this.state.time.hour,
                                            minute,
                                            amPm: this.state.time.amPm    
                                        }
                                    })}
                                    placeholder={{label: 'Select minute', value: null}}
                                    items={datetime.minutePickerItems}
                                />
                                <View style={contentItems.inlineBtnsContainers}>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.amPm.amColor }}
                                        title="am" 
                                        onPress={() => this.onAmPmClick('am')}/>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.amPm.pmColor }}
                                        title="pm" 
                                        onPress={() => this.onAmPmClick('pm')}/>
                                </View>
                            </View>
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
                    </View>
                    <View style={contentItems.nextButton}>
                        <Icon
                            name='arrow-circle-right'
                            type='font-awesome'
                            color={colors.green}
                            size={70}
                            onPress={() => this.updateDateTime()}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeSetPast);
