import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Input, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateVehicle, clearAllState } from '../../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../../state/actions/ActionMapper';
import { clearAllStateFn } from "../../state/providers/ui-actions/Navigation";
import viewNames from '../../state/ViewNames';

import colors from '../../styles/Colors';
import boundingLayout from '../../styles/BoundingLayout';
import contentItems from '../../styles/ContentItems';
import { logPageViewEvent } from '../../telemetry/AmplitudeManager';

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
        this.props.navigation.navigate(viewNames.DolPreCheckComments);
    }

    isNextBtnDisabled() {
        return !this.state.make || !this.state.model || !this.state.color;
    }

    componentDidMount() {
        logPageViewEvent(viewNames.VehicleDetailsCheck);
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
                            onPress={() => clearAllStateFn(this.props)}
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
                                <Input containerStyle={{ width: 200 }}
                                    inputStyle={contentItems.input}
                                    placeholder='Enter make'
                                    label=''
                                    onChangeText={make => this.setState({make})}
                                    testID={"VehicleDetailsCheck.Make"}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Model:
                                </Text>
                                <Input containerStyle={{ width: 200 }}
                                    inputStyle={contentItems.input}
                                    placeholder='Enter model'
                                    label=''
                                    onChangeText={model => this.setState({model})}
                                    testID={"VehicleDetailsCheck.Model"}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Color:
                                </Text>
                                <Input containerStyle={{ width: 200 }}
                                    inputStyle={contentItems.input}
                                    placeholder='Enter color'
                                    label=''
                                    onChangeText={color => this.setState({color})}
                                    testID={"VehicleDetailsCheck.Color"}
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
                            size={boundingLayout.footerNavigationBtn.height}
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
                            size={boundingLayout.footerNavigationBtn.height}
                            disabled={this.isNextBtnDisabled()}
                            disabledStyle={{ backgroundColor: colors.white }}
                            onPress={() => this.updateVehicle()}
                            testID={"VehicleDetailsCheck.Next"}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateVehicle,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(VehicleDetailsCheck);
