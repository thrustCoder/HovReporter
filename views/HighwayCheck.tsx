import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateHighway, clearAllState } from '../state/actions/AppActions';
import highwayPickerItems from '../state/providers/ui-content/Highway';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class HighwayCheck extends Component {
    state = {
        name: '',
        isRamp: null,
        yesBtnColor: colors.blue,
        noBtnColor: colors.blue
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

    onIsRampClick(isRamp) {
        if (isRamp) {
            this.state.yesBtnColor = colors.green;
            this.state.noBtnColor = colors.blue;
        } else {
            this.state.noBtnColor = colors.green;
            this.state.yesBtnColor = colors.blue;
        }

        this.setState({ isRamp });
    }

    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    isNextBtnDisabled() {
        return !this.state.name || this.state.isRamp === null;
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
                                name='road'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.inputLabel}>
                                    Highway:
                                </Text>
                                <RNPickerSelect style={{inputIOS: contentItems.pickerIOS}}
                                    onValueChange={(highwayName) => this.setState({name: highwayName})}
                                    placeholder={{label: 'Select highway', value: null}}
                                    items={highwayPickerItems}
                                />
                            </View>
                            <View style={boundingLayout.mainSubAreaFlowRow}>
                                <Text h4 style={contentItems.pickerLabel}>
                                    Happened on a ramp?
                                </Text>
                                <View style={contentItems.inlineBtnsContainers}>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.yesBtnColor }}
                                        title="Yes" 
                                        onPress={() => this.onIsRampClick(true)}/>
                                    <Button style={contentItems.amPmButton}
                                        buttonStyle={{ backgroundColor: this.state.noBtnColor }}
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
                            onPress={() => this.updateHighway()}
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
        updateHighway,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HighwayCheck);
