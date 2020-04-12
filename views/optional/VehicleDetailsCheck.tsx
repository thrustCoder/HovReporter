import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVehicle } from '../../state/actions/AppActions';

class VehicleDetailsCheck extends Component {
    state = {
        make: '',
        model: '',
        color: ''
    };

    updateVehicle() {
        this.props.updateVehicle({
            make: this.state.make,
            model: this.state.model,
            color: this.state.color
        });
        this.props.navigation.navigate('DolPreLaunch');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Add vehicle details</Text>
                <Text h3 style={styles.containerH3}>Make</Text>
                <Input
                    placeholder='Make'
                    label='Make'
                    onChangeText={make => this.setState({make})}
                    leftIcon={
                        <Icon
                            name='border-outer'
                            type='material'
                            color='black'
                        />
                    }
                />
                <Text h3 style={styles.containerH3}>Model</Text>
                <Input
                    placeholder='Model'
                    label='Model'
                    onChangeText={model => this.setState({model})}
                    leftIcon={
                        <Icon
                            name='border-outer'
                            type='material'
                            color='black'
                        />
                    }
                />
                <Text h3 style={styles.containerH3}>Color</Text>
                <Input
                    placeholder='Color'
                    label='Color'
                    onChangeText={color => this.setState({color})}
                    leftIcon={
                        <Icon
                            name='border-outer'
                            type='material'
                            color='black'
                        />
                    }
                />
                <Button title="Next" onPress={() => this.updateVehicle()}/>
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
        updateVehicle,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsCheck);
