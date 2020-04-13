import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate } from '../state/actions/AppActions';

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
        this.props.updateDate({
            day: this.state.date.day,
            month: this.state.date.month,
            year: this.state.date.year
        });
        this.props.updateTime({
            hour: this.state.time.hour,
            minute: this.state.time.minute,
            amPm: this.state.time.amPm    
        });
        this.props.navigation.navigate('OccupancyCheck');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Select month</Text>
                <RNPickerSelect
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
                        { label: '12', value: '12' },
                    ]}
                />
                <Text h3 style={styles.containerH3}>Select year</Text>
                <RNPickerSelect
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
                        { label: '3', value: '3' }
                    ]}
                />
                <Text h3 style={styles.containerH3}>Select minute</Text>
                <RNPickerSelect
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
                        { label: '10', value: '10' }
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
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimeSetPast);
