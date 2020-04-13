import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

class DolPreLaunch extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>As the final step, we will navigate you to the Department of Licensing site for submitting the form. </Text>
                <Text>We have already filled the form for you, based on your input data. </Text>
                <Text>In the form, please check the box for Captcha and click Submit. That's it! </Text>
                <Button title="Let's go" onPress={() => this.props.navigation.navigate('DolForm')} />
            </View>
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
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateOccupants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DolPreLaunch);
