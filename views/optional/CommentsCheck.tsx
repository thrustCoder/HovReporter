import React, {Component} from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateComments, clearAllState } from '../../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../../state/actions/ActionMapper';
import { clearAllStateFn } from "../../state/providers/ui-actions/Navigation";

import colors from '../../styles/Colors';
import boundingLayout from '../../styles/BoundingLayout';
import contentItems from '../../styles/ContentItems';
import viewNames from '../../state/ViewNames';
import { logPageViewEvent } from '../../telemetry/AmplitudeManager';

class CommentsCheck extends Component {
    state = {
        comments: '',
    };

    updateComments() {
        this.state.comments = this.state.comments.replace(/\n/g, " ");
        this.props.updateComments(this.state.comments);
        this.props.navigation.navigate(viewNames.DolPreLaunch);
    }

    componentDidMount() {
        logPageViewEvent(viewNames.CommentsCheck);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                                    name='comments'
                                    type='font-awesome'
                                    color={colors.green}
                                    size={100}
                                />
                            </View>
                            <View style={boundingLayout.mainArea}>
                                <Text h3 style={contentItems.mainText}>
                                    Comments
                                </Text>
                                <Input style={contentItems.textarea}
                                    containerStyle={contentItems.textareaContainer}
                                    placeholder='Enter comments'
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={(comments) => this.setState({comments})}
                                    value={this.state.comments}
                                    testID={"CommentsCheck.Comments"}
                                />
                            </View>
                            <View style={boundingLayout.actionArea}>
                                <Button style={contentItems.mainButton} 
                                        titleStyle={contentItems.buttonTitle}
                                        buttonStyle={{ backgroundColor: colors.green }}
                                        title="Finish report" 
                                        onPress={() => this.updateComments()}
                                        testID={"CommentsCheck.FinishReport"}
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
                        <View style={contentItems.skipButtonFiller}>
                        </View>
                        <View style={contentItems.nextButtonFiller}>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateComments,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(CommentsCheck);
