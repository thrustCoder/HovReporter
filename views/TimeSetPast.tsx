import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate, updateTime } from '../state/actions/AppActions';

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
        this.props.navigation.navigate('OccupancyCheck');
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
                    items={[
                        { label: 'Jan', value: '1' },
                        { label: 'Feb', value: '2' },
                        { label: 'Mar', value: '3' },
                        { label: 'Apr', value: '4' },
                    ]}
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
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '13', value: '13' },
                    ]}
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
                    items={[
                        { label: '2019', value: '2019' },
                        { label: '2020', value: '2020' },
                        { label: '2021', value: '2021' }
                    ]}
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
                    items={[
                        { label: '1', value: '1' },
                        { label: '2', value: '2' },
                        { label: '3', value: '3' },
                        { label: '10', value: '10' }
                    ]}
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
                    items={[
                        { label: '00', value: '0' },
                        { label: '05', value: '5' },
                        { label: '10', value: '10' },
                        { label: '45', value: '45' }
                    ]}
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
                <Button title="Previous" onPress={() => this.props.navigation.navigate('LicenseCheck')}/>
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
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateDate,
        updateTime
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimeSetPast);
