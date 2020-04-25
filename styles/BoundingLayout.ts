import { StyleSheet } from 'react-native';

const boundingLayout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    header: {
        height: 100,
        backgroundColor: 'chartreuse'
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
        backgroundColor: 'aqua'
    },
    boundingContainer: {
        backgroundColor: 'beige',
        marginHorizontal: 20
    }
});

export default boundingLayout;
