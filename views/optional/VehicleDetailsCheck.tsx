import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateVehicle, clearAllState } from '../../state/actions/AppActions';

import colors from '../../styles/Colors';
import boundingLayout from '../../styles/BoundingLayout';
import contentItems from '../../styles/ContentItems';

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
        this.props.navigation.navigate('DolPreCheckComments');
    }

    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    isNextBtnDisabled() {
        return !this.state.make || !this.state.model || !this.state.color;
    }

    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.header}>
                    <View style={contentItems.cancelButton}>
                        <Icon
                            name='times-circle'
                            type='font-awesome'
                            color={colors.red}
                            size={50}
                            onPress={() => this.clearAllState()}
                        />
                    </View>       
                </View>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Icon
                                name='car'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Make:
                                </Text>
                                <Input containerStyle={{ width: 150, backgroundColor: '#a52a2a' }}
                                    inputStyle={{ marginTop: -10 }}
                                    placeholder='Enter make'
                                    label=''
                                    onChangeText={make => this.setState({make})}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Model:
                                </Text>
                                <Input containerStyle={{ width: 150, backgroundColor: '#a52a2a' }}
                                    inputStyle={{ marginTop: -10 }}
                                    placeholder='Enter model'
                                    label=''
                                    onChangeText={model => this.setState({model})}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Color:
                                </Text>
                                <Input containerStyle={{ width: 150, backgroundColor: '#a52a2a' }}
                                    inputStyle={{ marginTop: -10 }}
                                    placeholder='Enter color'
                                    label=''
                                    onChangeText={color => this.setState({color})}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boundingLayout.footer}>
                    <View style={contentItems.backButton}>
                        <Icon
                            name='arrow-circle-left'
                            type='font-awesome'
                            color={colors.green}
                            size={70}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <View style={contentItems.skipButtonFiller}>
                    </View>
                    <View style={contentItems.nextButton}>
                        <Icon
                            name='arrow-circle-right'
                            type='font-awesome'
                            color={this.isNextBtnDisabled() ? colors.darkGray : colors.green}
                            size={70}
                            disabled={this.isNextBtnDisabled()}
                            disabledStyle={{ backgroundColor: 'aqua' }}
                            onPress={() => this.updateVehicle()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateVehicle,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(VehicleDetailsCheck);