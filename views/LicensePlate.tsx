import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

class LicensePlate extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h3 style={styles.containerH3}>License plate</Text>
                <Input
                    placeholder='License plate number'
                    label='License plate number'
                    leftIcon={
                        <Icon
                            name='border-outer'
                            type='material'
                            color='black'
                        />
                    }
                />
                <Text h4 style={styles.containerH3}>License state</Text>
                <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    placeholder={{label: 'State', value: null}}
                    items={[
                        { label: 'Alabama', value: 'AL' },
                        { label: 'Alaska', value: 'AK' },
                        { label: 'American Samoa', value: 'AS' },
                    ]}
                />
                <Button title="Next" style={{ height: 50, width: 100, marginTop: 40 }} onPress={() => this.props.navigation.navigate('HighwayPicker')}/>
                <Button title="Previous" onPress={() => this.props.navigation.navigate('DriverCheck')}/>
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

export default LicensePlate;
