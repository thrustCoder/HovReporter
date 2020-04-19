import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants, clearAllState } from '../../state/actions/AppActions';

class DolPreCheckComments extends Component {
    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.foregroundText}>All set to finish the Department of Licensing report.</Text>
                <Text style={styles.foregroundText}>Do you want to enter any additional comments?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('CommentsCheck')} />
                <Button title="No, finish the report" onPress={() => this.props.navigation.navigate('DolPreLaunch')} />
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
    foregroundText: {
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
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DolPreCheckComments);
