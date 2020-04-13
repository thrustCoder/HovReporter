import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateTime } from '../state/actions/AppActions';

class TimeCheck extends Component {
    mapCurrentTimeToState() {
        let currentDateTime = new Date();
        let hour = currentDateTime.getHours() % 12;
        let minute = currentDateTime.getMinutes() - (currentDateTime.getMinutes() % 5);
        let amPm = (currentDateTime.getHours() >= 12) ? 'pm' : 'am'
        let time = {
            hour,
            minute,
            amPm
        }
    
        this.props.updateTime(time);
        this.props.navigation.navigate('OccupancyCheck');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Did you notice the violation just now (within past 10 minutes)?</Text>
                <Button title="Yes" onPress={() => this.mapCurrentTimeToState()}/>
                <Button title="No" onPress={() => this.props.navigation.navigate('TimeSetPast')}/>
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
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
      updateTime,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TimeCheck);
