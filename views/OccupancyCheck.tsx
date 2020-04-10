import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class OccupancyCheck extends Component {
    updateOccupants(numberOfOccupants) {
        this.props.updateOccupants(numberOfOccupants);
        this.props.navigation.navigate('LicenseCheck');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>How many people do you see in the vehicle?</Text>
                <Button title="1" onPress={() => this.updateOccupants(1)}/>
                <Button title="2" onPress={() => this.updateOccupants(2)}/>
            </View>
        );
    }
}

// DOIT: better structure of styles?
// DOIT: extract to common styles?
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerH3: {
        color: 'white',
    }
});

const mapStateToProps = (state) => {
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateOccupants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OccupancyCheck);
