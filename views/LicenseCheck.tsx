import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { updateLicense, clearAllState } from '../state/actions/AppActions';
import statePickerItems from '../state/providers/ui-content/State';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { getNextStepFn, clearAllStateFn } from "../state/providers/ui-actions/Navigation";
import viewNames from '../state/ViewNames';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

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
        this.props.navigation.navigate(getNextStepFn(this.props, viewNames.LicenseCheck));
    }

    isNextBtnDisabled() {
        return !this.state.plate || !this.state.stateProvince;
    }

    isSkipBtnDisabled() {
        return getNextStepFn(this.props, viewNames.LicenseCheck) === viewNames.DolPreCheck;
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
                                name='keyboard'
                                type='material'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    License plate:
                                </Text>
                                <Input containerStyle={{ width: 170 }}
                                    inputStyle={contentItems.input}
                                    placeholder='Plate #'
                                    label=''
                                    autoCapitalize='characters'
                                    onChangeText={plate => this.setState({plate})}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    License state:
                                </Text>
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(stateProvince) => this.setState({stateProvince})}
                                    placeholder={{label: 'State', value: null}}
                                    items={statePickerItems}
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
                    <View style={contentItems.skipButton}>
                        <Icon
                            name='debug-step-over'
                            type='material-community'
                            color={this.isSkipBtnDisabled() ? colors.darkGray : colors.green}
                            size={boundingLayout.footerSkipBtn.height}
                            disabled={this.isSkipBtnDisabled()}
                            disabledStyle={{ backgroundColor: colors.white }}
                            onPress={() => this.props.navigation.navigate(getNextStepFn(this.props, viewNames.LicenseCheck))}
                        />
                    </View>
                    <View style={contentItems.nextButton}>
                        <Icon
                            name='arrow-circle-right'
                            type='font-awesome'
                            color={this.isNextBtnDisabled() ? colors.darkGray : colors.green}
                            size={boundingLayout.footerNavigationBtn.height}
                            disabled={this.isNextBtnDisabled()}
                            disabledStyle={{ backgroundColor: colors.white }}
                            onPress={() => this.updateLicense()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateLicense,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(LicenseCheck);
