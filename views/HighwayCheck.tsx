import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { updateHighway, updateLocation, clearAllState } from '../state/actions/AppActions';
import highwayPickerItems from '../state/providers/ui-content/Highway';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { getNextStepFn, clearAllStateFn } from "../state/providers/ui-actions/Navigation";
import viewNames from '../state/ViewNames';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import { logPageViewEvent } from '../telemetry/AmplitudeManager';

class HighwayCheck extends Component {
    state = {
        name: 'I-5NB',
        isRamp: null,
        location: '',
        yesBtnColor: colors.darkGray,
        noBtnColor: colors.darkGray,
        notSureBtnColor: colors.darkGray
    };

    updateHighway() {
        this.props.updateHighway({
            name: this.state.name,
            isRamp: this.state.isRamp || false
        });

        this.props.updateLocation(this.state.location || 'Not sure');
        this.props.navigation.navigate(getNextStepFn(this.props, viewNames.HighwayCheck));
    }

    onIsRampClick(isRamp) {
        if (isRamp) {
            this.state.yesBtnColor = colors.green;
            this.state.noBtnColor = colors.darkGray;
        } else {
            this.state.noBtnColor = colors.green;
            this.state.yesBtnColor = colors.darkGray;
        }

        this.setState({ isRamp });
    }

    onNotSureClick() {
        this.state.notSureBtnColor = colors.green;
        this.setState({location: 'Not sure'});
    }

    onChangeText(location) {
        if (this.state.notSureBtnColor === colors.green) {
            this.state.notSureBtnColor = colors.darkGray;
        }
        this.setState({location});
    }

    isNextBtnDisabled() {
        return !this.state.name || !this.state.location || this.state.isRamp === null;
    }

    isSkipBtnDisabled() {
        return getNextStepFn(this.props, viewNames.HighwayCheck) === viewNames.DolPreCheck;
    }

    componentDidMount() {
        logPageViewEvent(viewNames.HighwayCheck);
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
                                name='road'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <View style={boundingLayout.mainSubAreaFlowRow}
                                    testID={"HighwayCheck.Highway"}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Highway:
                                </Text>
                                <RNPickerSelect style={{
                                        inputIOS: contentItems.pickerIOS, 
                                        inputAndroid: contentItems.pickerAndroid 
                                    }}
                                    value={this.state.name}
                                    useNativeAndroidPickerStyle={false}
                                    onValueChange={(highwayName) => this.setState({name: highwayName})}
                                    placeholder={{label: 'Select highway', value: null}}
                                    items={highwayPickerItems}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Location:
                                </Text>
                                <Input containerStyle={{ width: 150 }}
                                    inputStyle={contentItems.inputSmall}
                                    placeholder='e.g. nearest exit'
                                    value={this.state.location}
                                    label=''
                                    onChangeText={location => this.onChangeText(location)}
                                    testID={"HighwayCheck.Location"}
                                />
                                <View style={contentItems.inlineBtnsContainers}>
                                    <Button style={contentItems.notSureButton}
                                        buttonStyle={{ backgroundColor: this.state.notSureBtnColor }}
                                        title="Not sure" 
                                        onPress={() => this.onNotSureClick()}
                                        testID={"HighwayCheck.LocationNotSure"}/>
                                </View>
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Happened on a ramp?
                                </Text>
                                <View style={contentItems.inlineBtnsContainers}>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.yesBtnColor }}
                                        testID={"HighwayCheck.RampYes"}
                                        title="Yes" 
                                        onPress={() => this.onIsRampClick(true)}/>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.noBtnColor }}
                                        testID={"HighwayCheck.RampNo"}
                                        title="No"
                                        onPress={() => this.onIsRampClick(false)}/>
                                </View>
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
                            onPress={() => this.props.navigation.navigate(getNextStepFn(this.props, viewNames.HighwayCheck))}
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
                            onPress={() => this.updateHighway()}
                            testID={"HighwayCheck.Next"}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateHighway,
    updateLocation,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(HighwayCheck);
