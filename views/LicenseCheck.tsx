import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLicense, clearAllState } from '../state/actions/AppActions';
import statePickerItems from '../state/providers/ui-content/State';

class LicenseCheck extends Component {
    state = {
        plate: '',
        stateProvince: ''
    };

    updateLicense() {
        this.props.updateLicense({
            plate: this.state.plate,
            state: this.state.stateProvince
        });
        this.props.navigation.navigate(this.getNextStep());
    }

    getNextStep() {
        let currentNavIndex = this.props.navState.navSequence.lastIndexOf('LicenseCheck');
        let i = currentNavIndex;
        let nextState;

        do {
            i = (i + 1) % 4;
            nextState = this.props.navState[this.props.navState.navSequence[i]];
        } while (nextState.completed === true && this.props.navState.navSequence[i] !== 'LicenseCheck');

        if (this.props.navState.navSequence[i] === 'LicenseCheck') {
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
                <Text h3 style={styles.containerH3}>License plate</Text>
                <Input
                    placeholder='License plate number'
                    label='License plate number'
                    onChangeText={plate => this.setState({plate})}
                    leftIcon={
                        <Icon
                            name='border-outer'
                            type='material'
                            color='black'
                        />
                    }
                />
                <Text h4 style={styles.containerH3}>License state</Text>
                <RNPickerSelect
                    onValueChange={(stateProvince) => this.setState({stateProvince})}
                    placeholder={{label: 'State', value: null}}
                    items={statePickerItems}
                />
                <Button title="Next" 
                    disabled={!this.state.plate || !this.state.stateProvince}
                    onPress={() => this.updateLicense()}
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
        updateLicense,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LicenseCheck);
