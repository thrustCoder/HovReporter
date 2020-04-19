import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants, clearAllState } from '../state/actions/AppActions';

class FinalSuccess extends Component {
    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.navigate('Start');
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title="SUCCESS" onPress={() => this.clearAllState()} />
                <Text>Following action would be taken against the offender (per WA Department of Licensing site): </Text>
                <Text>First-time HOV lane violators are sent an educational brochure. Second-time HOV lane violators are sent a letter from WSDOT. Third-time HOV lane violators are sent a letter from the Washington State Patrol. </Text>
                <Text>If a law enforcement officer sees an offender, there is a possible fine of $186 for first offense and up to $536 for those who are repeat offenders. </Text>
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
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(FinalSuccess);
