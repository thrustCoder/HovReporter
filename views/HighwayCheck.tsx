import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateHighway } from '../state/actions/AppActions';

class HighwayCheck extends Component {
    state = {
        name: '',
        isRamp: false
    };

    updateHighway() {
        this.props.updateHighway({
            name: this.state.name,
            isRamp: this.state.isRamp
        });
        this.props.navigation.navigate('DolPreCheck');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Select highway</Text>
                <RNPickerSelect
                    onValueChange={(highwayName) => this.setState({name: highwayName})}
                    placeholder={{label: 'Select highway', value: null}}
                    items={[
                        { label: 'I-5 Northbound', value: 'I-5NB' },
                        { label: 'I-5 Southbound', value: 'I-5SB' },
                        { label: 'I-90 Eastbound', value: 'I-90EB' },
                    ]}
                />
                <Text h3 style={styles.containerH3}>Did the violation happen on a ramp?</Text>
                <Button title="Yes" onPress={() => this.setState({isRamp: true})}/>
                <Button title="No" onPress={() => this.setState({isRamp: false})}/>

                <Button title="Next" onPress={() => this.updateHighway()}/>
                <Button title="Previous" onPress={() => this.props.navigation.navigate('LicenseCheck')}/>
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
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateHighway,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HighwayCheck);
