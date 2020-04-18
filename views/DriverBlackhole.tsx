import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class DriverBlackhole extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3>Please focus on driving.</Text>
                <Text onPress={() => this.props.navigation.popToTop()}>Start over</Text>
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
        updateOccupants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DriverBlackhole);
