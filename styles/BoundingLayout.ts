import { StyleSheet } from 'react-native';

const boundingLayout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        height: 100,
        backgroundColor: 'chartreuse',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    content: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        height: 90,
        backgroundColor: 'aqua',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    boundingContainer: {
        backgroundColor: 'beige',
        marginHorizontal: 20
    },
    topImageArea: {
        alignSelf: 'center'
    },
    mainArea: {
        marginVertical: 20,
        textAlign: 'center',
        backgroundColor: 'aquamarine'
    },
    mainSubAreaFlowRow: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#8a2be2'
    },
    actionArea: {
        marginTop: 40,
        marginBottom: 20,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default boundingLayout;