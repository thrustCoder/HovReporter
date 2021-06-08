import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { updateDate, updateTime, updateDateTime, clearAllState } from '../state/actions/AppActions';
import datetime from '../state/providers/ui-content/DateTime';
import { getNextStepFn, clearAllStateFn } from "../state/providers/ui-actions/Navigation";
import viewNames from "../state/ViewNames";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

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
            amColor: colors.darkGray,
            pmColor: colors.darkGray
        }
    };

    constructor(props) {
        super(props);

        let currentDateTime = new Date();
        if (currentDateTime.getHours() >= 12) {
            this.state.amPm.amColor = colors.darkGray;
            this.state.amPm.pmColor = colors.green;
        } else {
            this.state.amPm.amColor = colors.green;
            this.state.amPm.pmColor = colors.darkGray;
        }
    }

    updateDateTime() {
        let currentDateTime = new Date();
        this.props.updateDate({
            day: this.state.date.day || currentDateTime.getDate(),
            month: this.state.date.month || (currentDateTime.getMonth() + 1),
            year: this.state.date.year || currentDateTime.getFullYear()
        });
        this.props.updateTime({
            hour: this.state.time.hour || (currentDateTime.getHours() % 12 === 0 ? '12' : (currentDateTime.getHours() % 12)),
            minute: this.state.time.minute || (currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5)),
            amPm: this.state.time.amPm || ((currentDateTime.getHours() >= 12) ? 'pm' : 'am')
        });

        this.props.updateDateTime();
        this.props.navigation.navigate(getNextStepFn(this.props, viewNames.TimeCheck));
    }

    onAmPmClick(amPmClicked) {
        if (amPmClicked === 'am') {
            this.state.amPm.amColor = colors.green;
            this.state.amPm.pmColor = colors.darkGray;
        } else {
            this.state.amPm.pmColor = colors.green;
            this.state.amPm.amColor = colors.darkGray;
        }

        this.setState({
            time: {
                hour: this.state.time.hour,
                minute: this.state.time.minute,
                amPm: amPmClicked   
            }
        });
    }

    componentDidMount() {
        logPageViewEvent(viewNames.TimeSetPast);
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
                                Please enter the time when it happened.
                            </Text>
                            <View style={boundingLayout.mainSubAreaFlowRow}
                                    data-i9n-picker={"TimeSetPast.Date"}
                                    data-i9n-capture={"true"}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Day:
                                </Text>
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
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
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
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
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
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
                            <View style={boundingLayout.mainSubAreaFlowRow}
                                    data-i9n-picker={"TimeSetPast.Time"}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Hour:
                                </Text>
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
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
                                    Minute:
                                </Text>
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
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
                            size={boundingLayout.footerNavigationBtn.height}
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
                            size={boundingLayout.footerNavigationBtn.height}
                            onPress={() => this.updateDateTime()}
                            data-i9n-btn={"TimeSetPast.Next"}
                        />
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

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(TimeSetPast);
