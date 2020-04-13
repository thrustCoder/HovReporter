import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class DriverCheck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Are you currently driving and using the app?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('DriverBlackhole')}/>
                <Text onPress={() => this.props.navigation.navigate('TimeCheck')}>No</Text>
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
