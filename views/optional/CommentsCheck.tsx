import React, {Component} from 'react';
import { StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateComments, clearAllState } from '../../state/actions/AppActions';

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
            <ScrollView keyboardShouldPersistTaps='handled'>
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Additional comments</Text>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={{ height: 100, width: 300, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(comments) => this.setState({comments})}
                    value={this.state.comments} />
                <Button title="Finish report" onPress={() => this.updateComments()}/>
                <Button title="Back" onPress={() => this.props.navigation.goBack()}/>
                <Button title="Cancel" onPress={() => this.clearAllState()} />
            </View>
            </ScrollView>
        );
    }
}

// DOIT: better structure of styles?
// DOIT: extract to common styles?
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerH3: {
        color: 'black',
    }
});

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
