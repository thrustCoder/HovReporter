import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateOccupants } from '../state/actions/AppActions';

import colors from '../styles/Colors';
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
                        <View style={boundingLayout.topImageArea}>
                            <Image style={contentItems.carPassingImage} source={require('../images/hov-sign.jpg')} />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h3 style={contentItems.mainText}>
                                Saw someone using an HOV lane illegally?
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                Let's report the violation on Department of Licensing site. It's simple!
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButton} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="Let's report" 
                                    onPress={() => this.props.navigation.navigate('DriverCheck')} 
                            />
                        </View>
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
