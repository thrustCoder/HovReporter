import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateHighway, clearAllState } from '../state/actions/AppActions';
import highwayPickerItems from '../state/providers/ui-content/Highway';

class HighwayCheck extends Component {
    state = {
        name: '',
        isRamp: null
    };

    updateHighway() {
        this.props.updateHighway({
            name: this.state.name,
            isRamp: this.state.isRamp || false
        });
        this.props.navigation.navigate(this.getNextStep());
    }

    getNextStep() {
        let currentNavIndex = this.props.navState.navSequence.lastIndexOf('HighwayCheck');
        let i = currentNavIndex;
        let nextState;

        do {
            i = (i + 1) % 4;
            nextState = this.props.navState[this.props.navState.navSequence[i]];
        } while (nextState.completed === true && this.props.navState.navSequence[i] !== 'HighwayCheck');

        if (this.props.navState.navSequence[i] === 'HighwayCheck') {
            return 'DolPreCheck';
        }

        return this.props.navState.navSequence[i];
    }

    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Select highway</Text>
                <RNPickerSelect
                    onValueChange={(highwayName) => this.setState({name: highwayName})}
                    placeholder={{label: 'Select highway', value: null}}
                    items={highwayPickerItems}
                />
                <Text h3 style={styles.containerH3}>Did the violation happen on a ramp?</Text>
                <Button title="Yes" onPress={() => this.setState({isRamp: true})}/>
                <Button title="No" onPress={() => this.setState({isRamp: false})}/>

                <Button title="Next" 
                    disabled={!this.state.name || this.state.isRamp === null}
                    onPress={() => this.updateHighway()}
                />
                <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
                <Button title="Cancel" onPress={() => this.clearAllState()} />
                <Button title="Skip" 
                    disabled={this.getNextStep() === 'DolPreCheck'}
                    onPress={() => this.props.navigation.navigate(this.getNextStep())} 
                />
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
        paddingBottom: 0,
        marginBottom: 0,
    }
});

const mapStateToProps = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateHighway,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HighwayCheck);
