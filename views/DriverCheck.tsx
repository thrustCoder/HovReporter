import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Button } from 'react-native-elements';
import { clearAllState } from '../state/actions/AppActions';

class DriverCheck extends Component {
    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Are you currently driving and using the app?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('DriverBlackhole')}/>
                <Text onPress={() => this.props.navigation.navigate('TimeCheck')}>No</Text>
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
    }
});

const mapStateToProps = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DriverCheck);
