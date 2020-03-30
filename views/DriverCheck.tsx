import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

class DriverCheck extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Are you the driver?</Text>
                <Button title="Yes" onPress={() => this.props.navigation.navigate('DolForm')}/>
                <Button title="No" onPress={() => this.props.navigation.navigate('DolForm')}/>
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

export default DriverCheck;
