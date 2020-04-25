import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class Start extends Component {
    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.header}>
                </View>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={{ alignSelf: 'center' }}>
                            <Image style={contentItems.hovSignImage} source={require('../images/hov-sign.png')} />
                            <Image style={contentItems.carPassingImage} source={require('../images/car-passing.gif')} />
                        </View>
                        <View style={contentItems.mainText}>
                            <Text h4 style={contentItems.subText}>
                                Saw someone using an HOV lane illegally?
                            </Text>
                            <Text h4 style={contentItems.subText}>
                                Let's report the violation on Department of Licensing site. It's simple!
                            </Text>
                        </View>
                        <Button style={contentItems.mainButton} 
                                title="Let's report" 
                                onPress={() => this.props.navigation.navigate('DriverCheck')} 
                        />
                    </View>
                </View>
                <View style={boundingLayout.footer}>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { appState } = state
    return { appState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateOccupants,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Start);
