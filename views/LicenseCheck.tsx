import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLicense } from '../state/actions/AppActions';

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
        this.props.navigation.navigate('HighwayCheck');
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
                    items={[
                        { label: 'Alabama', value: 'AL' },
                        { label: 'Alaska', value: 'AK' },
                        { label: 'American Samoa', value: 'AS' },
                    ]}
                />
                <Button title="Next" onPress={() => this.updateLicense()}/>
                <Button title="Previous" onPress={() => this.props.navigation.navigate('DriverCheck')}/>
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

const mapStateToProps = (stateProvince) => {
    const { appState } = stateProvince
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateLicense,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LicenseCheck);
