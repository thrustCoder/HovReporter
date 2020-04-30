import React, {Component} from 'react';
import { View, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Button, Icon, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComments, clearAllState } from '../../state/actions/AppActions';

import colors from '../../styles/Colors';
import boundingLayout from '../../styles/BoundingLayout';
import contentItems from '../../styles/ContentItems';

class CommentsCheck extends Component {
    state = {
        comments: '',
    };

    updateComments() {
        this.props.updateComments(this.state.comments);
        this.props.navigation.navigate('DolPreLaunch');
    }

    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
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
                            onPress={() => this.clearAllState()}
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
                            />
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButton} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="Finish report" 
                                    onPress={() => this.updateComments()} 
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

const mapStateToProps = (state) => {
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateComments,
        clearAllState
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsCheck);
