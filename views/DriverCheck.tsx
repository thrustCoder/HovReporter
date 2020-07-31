import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Button, Icon } from 'react-native-elements';
import { clearAllState } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { clearAllStateFn } from "../state/providers/ui-actions/Navigation";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';
import viewNames from '../state/ViewNames';
import metricNames from '../state/MetricNames';
import * as Amplitude from 'expo-analytics-amplitude';

class DriverCheck extends Component {
    componentDidMount() {
        Amplitude.logEventWithProperties(metricNames.PageView, {
            name: viewNames.DriverCheck
        });        
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
                                name='mobile'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Are you using the app while driving?
                            </Text>
                        </View>
                        <View style={boundingLayout.actionAreaSmall}>
                            <Button style={contentItems.mainButtonPrimary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="Yes" 
                                    onPress={() => this.props.navigation.navigate(viewNames.DriverBlackhole)} 
                            />
                            <Button style={contentItems.mainButtonSecondary} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="No" 
                                    onPress={() => this.props.navigation.navigate(viewNames.LicenseCheck)} 
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
                            size={boundingLayout.footerNavigationBtn.height}
                            onPress={() => this.props.navigation.goBack()}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(DriverCheck);
