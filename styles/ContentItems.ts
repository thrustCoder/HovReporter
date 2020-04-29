import { StyleSheet } from 'react-native';

const mainTextCore = {
    marginVertical: 7,
    marginBottom: 15,
    textAlign: 'center',
    backgroundColor: 'aquamarine'
};
const centeredButton = {
    marginHorizontal: 10,
    marginVertical: 10
};

const contentItems = StyleSheet.create({
    mainText: {
        ...mainTextCore
    },
    mainButton: {
        width: 150,
        alignSelf: 'center'
    },
    cancelButton: {
        ...centeredButton
    },
    backButton: {
        ...centeredButton
    },
    skipButton: {
        flexGrow: 1,
        marginHorizontal: 10,
    },
    nextButton: {
        ...centeredButton
    },
    skipButtonFiller: {
        flexGrow: 1,
        width: 70,
        marginHorizontal: 10,
    },
    nextButtonFiller: {
        width: 70,
        ...centeredButton
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
    amPmButton: {
        marginHorizontal: 5,
        marginVertical: 3,
    },
    amPmContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
    },
    // https://github.com/lawnstarter/react-native-picker-select/issues/29#issuecomment-397457974
    pickerIOS: {
        color: 'white',
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 5,
        fontSize: 25,
        backgroundColor: '#a52a2a'
    },
    pickerLabel: {
        ...mainTextCore,
        marginLeft: 10,
    },
});

export default contentItems;
