import { StyleSheet } from 'react-native';
import colors from './Colors';

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
    mainButtonSecondaryLong: {
        width: 250,
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
    inlineBtnsContainers: {
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
        width: 350, 
        height: 120,
        marginVertical: 20
    },
    noTextWhileDriveImage: {
        width: 150,
        height: 135,
        resizeMode: 'center'
    },
    // https://github.com/lawnstarter/react-native-picker-select/issues/29#issuecomment-397457974
    pickerIOS: {
        color: colors.white,
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 5,
        fontSize: 25,
        backgroundColor: colors.green
    },
    pickerAndroid: {
        color: colors.white,
        marginVertical: 10,
        marginRight: 10,
        marginLeft: 5,
        fontSize: 25,
        backgroundColor: colors.green
    },
    pickerLabel: {
        ...mainTextCore,
        marginLeft: 10,
    },
    input: {
        marginTop: -13, 
        fontSize: 30
    },
    inputLabel: {
        ...mainTextCore,
        marginLeft: 10,
    },
    textarea: {
        width: 300, 
        borderColor: colors.darkGray, 
        borderWidth: 1
    },
    textareaContainer: {
        width: 300, 
        height: 150
    }
});

export default contentItems;
