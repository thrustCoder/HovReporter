import { StyleSheet } from 'react-native';

const contentItems = StyleSheet.create({
    mainText: {
        marginVertical: 7,
        marginBottom: 15,
        textAlign: 'center',
        backgroundColor: 'aquamarine'
    },
    mainButton: {
        width: 150,
        alignSelf: 'center'
    },
    cancelButton: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    backButton: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    mainButtonPrimary: {
        width: 70,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    mainButtonSecondary: {
        width: 70,
        alignSelf: 'center',
        marginHorizontal: 10
    },
    buttonTitle: { 
        fontWeight: '700', 
        fontSize: 25 
    },
    hovSignImage: { 
        width: 40, 
        height: 35, 
        marginBottom: -5 
    },
    carPassingImage: { 
        width: 150, 
        height: 105 
    },
    noTextWhileDriveImage: {
        width: 150,
        height: 135,
        resizeMode: 'center'
    }
});

export default contentItems;
