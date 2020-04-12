import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class FinalSuccess extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button title="SUCCESS" onPress={() => this.props.navigation.navigate('Start')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FinalSuccess);
