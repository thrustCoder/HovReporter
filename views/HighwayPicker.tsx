import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

class HighwayPicker extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>Select highway</Text>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    placeholder={{label: 'Select highway', value: null}}
                    items={[
                        { label: 'I-5 Northbound', value: 'I-5NB' },
                        { label: 'I-5 Southbound', value: 'I-5SB' },
                        { label: 'I-90 Eastbound', value: 'I-90EB' },
                    ]}
                />
                <Button title="Next" style={{ height: 50, width: 100, marginTop: 40 }} onPress={() => this.props.navigation.navigate('DolForm')}/>
                <Button title="Previous" onPress={() => this.props.navigation.navigate('LicensePlate')}/>
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
    paddingBottom: 0,
    marginBottom: 0,
  }
});

export default HighwayPicker;
