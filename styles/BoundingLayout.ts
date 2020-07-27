import { StyleSheet } from 'react-native';
import colors from './Colors';

const actionAreaCommon = {
    marginVertical: 15,
    // Has to be minimum 15.
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
};
const mainAreaCommon = {
    textAlign: 'center',
    backgroundColor: colors.white
};
const footerCommon = {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center'
};

const boundingLayout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        height: 85,
        backgroundColor: colors.white,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    content: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        ...footerCommon,
        height: 75,
        justifyContent: 'flex-start',
    },
    footerVersion: {
        ...footerCommon,
        height: 60,
        justifyContent: 'center',
    },
    footerNavigationBtn: {
        height: 60
    },
    footerSkipBtn: {
        height: 70
    },
    boundingContainer: {
        backgroundColor: colors.white,
        // Has to be minimum 15.
        marginHorizontal: 10
    },
    topImageArea: {
        alignSelf: 'center'
    },
    mainArea: {
        marginVertical: 20,
        ...mainAreaCommon
    },
    mainAreaCramped: {
        ...mainAreaCommon
    },
    actionArea: {
        ...actionAreaCommon
    },
    actionAreaSmall: {
        ...actionAreaCommon,
        width: 200,
        alignSelf: 'center',
    },
    mainSubAreaFlowRow: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
});

export default boundingLayout;
