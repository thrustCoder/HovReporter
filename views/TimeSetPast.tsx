import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate, updateTime, updateDateTime, clearAllState } from '../state/actions/AppActions';
import datetime from '../state/providers/ui-content/DateTime';

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

    render() {
        let currentDateTime = new Date();
        let currentMonth = `${this.state.date.month || (currentDateTime.getMonth() + 1)}`;
        let currentDay = `${this.state.date.day || currentDateTime.getDate()}`;
        let currentYear = `${this.state.date.year || currentDateTime.getFullYear()}`;
        let currentHour = `${this.state.time.hour || (currentDateTime.getHours() % 12)}`;
        let currentMinute = `${this.state.time.minute || (currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5))}`;

        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Select month</Text>
                <RNPickerSelect
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
                <Text h3 style={styles.containerH3}>Select day</Text>
                <RNPickerSelect
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
                <Text h3 style={styles.containerH3}>Select year</Text>
                <RNPickerSelect
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
                <Text h3 style={styles.containerH3}>Select hour</Text>
                <RNPickerSelect
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
                <Text h3 style={styles.containerH3}>Select minute</Text>
                <RNPickerSelect
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
                <Button title="am" onPress={() => this.setState({
                    time: {
                        hour: this.state.time.hour,
                        minute: this.state.time.minute,
                        amPm: 'am'    
                    }
                })}/>
                <Button title="pm" onPress={() => this.setState({
                    time: {
                        hour: this.state.time.hour,
                        minute: this.state.time.minute,
                        amPm: 'pm'    
                    }
                })}/>

                <Button title="Next" onPress={() => this.updateDateTime()}/>
                <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
                <Button title="Cancel" onPress={() => this.clearAllState()} />
            </View>
        );
    }
}

// DOIT: better structure of styles?
// DOIT: extract to common styles?
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerH3: {
        color: 'black',
        paddingBottom: 0,
        marginBottom: 0,
    }
});

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
