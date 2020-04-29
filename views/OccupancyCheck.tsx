import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants, clearAllState } from '../state/actions/AppActions';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class OccupancyCheck extends Component {
    state = {
        button1Color: colors.blue,
        button2Color: colors.blue
    };

    updateOccupants(numberOfOccupants) {
        if (numberOfOccupants === 1) {
            this.state.button1Color = colors.green;
            this.state.button2Color = colors.blue;
        } else {
            this.state.button2Color = colors.green;
            this.state.button1Color = colors.blue;
        }

        this.props.updateOccupants(numberOfOccupants);
        this.props.navigation.navigate(this.getNextStep());
    }

    getNextStep() {
        let currentNavIndex = this.props.navState.navSequence.lastIndexOf('OccupancyCheck');
        let i = currentNavIndex;
        let nextState;

        do {
            i = (i + 1) % 4;
            nextState = this.props.navState[this.props.navState.navSequence[i]];
        } while (nextState.completed === true && this.props.navState.navSequence[i] !== 'OccupancyCheck');

        if (this.props.navState.navSequence[i] === 'OccupancyCheck') {
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
                                name='torsos-male-female'
                                type='foundation'
                                color={colors.green}
                                size={100}
                                onPress={() => this.props.navigation.goBack()}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                How many people do you see in the vehicle?
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButtonPrimary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: this.state.button1Color }}
                                    title="1" 
                                    onPress={() => this.updateOccupants(1)} 
                            />
                            <Button style={contentItems.mainButtonSecondary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: this.state.button2Color }}
                                    title="2" 
                                    onPress={() => this.updateOccupants(2)} 
                            />
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
                    <View style={contentItems.nextButtonFiller}>
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
        updateOccupants,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OccupancyCheck);
