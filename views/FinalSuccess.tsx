import React, {Component} from 'react';
import { View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { updateOccupants, clearAllState } from '../state/actions/AppActions';
import { mapStateToPropsFn, getMapDispatchToPropsFn } from '../state/actions/ActionMapper';
import { clearAllStateFn } from "../state/providers/ui-actions/Navigation";

import colors from '../styles/Colors';
import boundingLayout from '../styles/BoundingLayout';
import contentItems from '../styles/ContentItems';

class FinalSuccess extends Component {
    render() {
        return (
            <View style={boundingLayout.container}>
                <View style={boundingLayout.content}>
                    <View style={boundingLayout.boundingContainer}>
                        <View style={boundingLayout.topImageArea}>
                            <Icon
                                name='check-circle'
                                type='font-awesome'
                                color={colors.green}
                                size={100}
                            />
                        </View>
                        <View style={boundingLayout.mainArea}>
                            <Text h2 style={contentItems.mainText}>
                                DONE!
                            </Text>
                            <Text h4 style={contentItems.mainText}>
                                As per the DOT site, following action would be taken against the offender:
                            </Text>
                            <Text style={contentItems.mainText}>
                                First-time HOV lane violators are sent an educational brochure. Second-time HOV lane violators are sent a letter from WSDOT. Third-time HOV lane violators are sent a letter from the Washington State Patrol.
                            </Text>
                            <Text style={contentItems.mainText}>
                                If a law enforcement officer sees an offender, there is a possible fine of $186 for first offense and up to $536 for those who are repeat offenders.
                            </Text>
                        </View>
                        <View style={boundingLayout.actionArea}>
                            <Button style={contentItems.mainButtonSecondaryLong} 
                                    titleStyle={contentItems.buttonTitle}
                                    buttonStyle={{ backgroundColor: colors.green }}
                                    title="Go back to start" 
                                    onPress={() => clearAllStateFn(this.props)} 
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapDispatchToPropsFn = getMapDispatchToPropsFn({
    updateOccupants,
    clearAllState
});

export default connect(mapStateToPropsFn, mapDispatchToPropsFn)(FinalSuccess);
