import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class DolPreCheck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.foregroundText}>All set to finish the Department of Licensing report.</Text>
                <Text style={styles.foregroundText}>Do you want to enter the make, model or color of vehicle?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('VehicleDetailsCheck')} />
                <Button title="No, finish the report" onPress={() => this.props.navigation.navigate('DolPreLaunch')} />
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
    foregroundText: {
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

export default connect(mapStateToProps, mapDispatchToProps)(DolPreCheck);
