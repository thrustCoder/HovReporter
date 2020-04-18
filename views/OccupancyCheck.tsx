import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class OccupancyCheck extends Component {
    updateOccupants(numberOfOccupants) {
        this.props.updateOccupants(numberOfOccupants);
        this.props.navigation.navigate(this.getNextStep());
    }

    getNextStep() {
        let currentNavIndex = this.props.navState.navSequence.lastIndexOf('OccupancyCheck');
        let i = currentNavIndex;
        let nextState;

        do {
            i = (i + 1) % 4;
            nextState = this.props.navState[this.props.navState.navSequence[i]];
        } while (nextState.completed === true && this.props.navState.navSequence[i] !== 'OccupancyCheck');

        if (!nextState) {
            return 'DolPreCheck';
        }

        return this.props.navState.navSequence[i];
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>How many people do you see in the vehicle?</Text>
                <Button title="1" onPress={() => this.updateOccupants(1)}/>
                <Button title="2" onPress={() => this.updateOccupants(2)}/>
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
        updateOccupants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OccupancyCheck);
