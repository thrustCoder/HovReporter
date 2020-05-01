import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Icon, Image } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearAllState } from '../state/actions/AppActions';

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class DriverBlackhole extends Component {
    clearAllState() {
        this.props.clearAllState();
        this.props.navigation.popToTop();
    }

    render() {
        return (
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
                            <Image style={contentItems.noTextWhileDriveImage} 
                                source={require('../images/text-while-drive.png')} 
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h2 style={contentItems.mainText}>
                                Please focus on driving.
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                You can always come back to the app and report the violation later.
                            </Text>
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
    const { appState, navState } = state
    return { appState, navState }
};
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        clearAllState,
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DriverBlackhole);