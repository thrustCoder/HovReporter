import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateDate, updateTime, updateDateTime } from '../state/actions/AppActions';

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

        if (!nextState) {
            return 'DolPreCheck';
        }

        return this.props.navState.navSequence[i];
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Did you notice the violation just now (within past 10 minutes)?</Text>
                <Button title="Yes" onPress={() => this.mapCurrentTimeToState()}/>
                <Button title="No" onPress={() => this.props.navigation.navigate('TimeSetPast')}/>
                <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
                <Button title="Cancel" onPress={() => this.props.navigation.popToTop()} />
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
        updateDateTime
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimeCheck);
