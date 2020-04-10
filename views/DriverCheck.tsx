import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class DriverCheck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Are you currently driving a vehicle?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('TimeCheck')}/>
                <Button title="No" onPress={() => this.props.navigation.navigate('TimeCheck')}/>
            </View>
        );
    }
}

// DOIT: better structure of styles?
// DOIT: extract to common styles?
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerH3: {
        color: 'white',
    }
});
