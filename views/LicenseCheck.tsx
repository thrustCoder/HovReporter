import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateLicense, clearAllState } from '../state/actions/AppActions';
import statePickerItems from '../state/providers/ui-content/State';

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
        this.props.navigation.navigate(this.getNextStep());
    }

    isNextBtnDisabled() {
        return !this.state.plate || !this.state.stateProvince;
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

    isSkipBtnDisabled() {
        return this.getNextStep() === 'DolPreCheck';
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
                                <Input containerStyle={{ width: 150, backgroundColor: '#a52a2a' }}
                                    inputStyle={contentItems.input}
                                    placeholder='Enter plate number'
                                    label=''
                                    autoCapitalize='characters'
                                    onChangeText={plate => this.setState({plate})}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    License state:
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
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
                            size={70}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <View style={contentItems.skipButton}>
                        <Icon
                            name='debug-step-over'
                            type='material-community'
                            color={this.isSkipBtnDisabled() ? colors.darkGray : colors.green}
                            size={85}
                            disabled={this.isSkipBtnDisabled()}
                            disabledStyle={{ backgroundColor: 'aqua' }}
                            onPress={() => this.props.navigation.navigate(this.getNextStep())}
                        />
                    </View>
                    <View style={contentItems.nextButton}>
                        <Icon
                            name='arrow-circle-right'
                            type='font-awesome'
                            color={this.isNextBtnDisabled() ? colors.darkGray : colors.green}
                            size={70}
                            disabled={this.isNextBtnDisabled()}
                            disabledStyle={{ backgroundColor: 'aqua' }}
                            onPress={() => this.updateLicense()}
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
        updateLicense,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(LicenseCheck);
