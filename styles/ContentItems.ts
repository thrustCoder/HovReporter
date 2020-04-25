import { StyleSheet } from 'react-native';

const contentItems = StyleSheet.create({
    mainText: {
        marginVertical: 20,
        textAlign: 'center',
        backgroundColor: 'aquamarine'
    },
    subText: {
        marginVertical: 7,
        textAlign: 'center',
        backgroundColor: 'aquamarine'
    },
    mainButton: {
        marginTop: 40,
        marginBottom: 20,
        marginHorizontal: 20,
        width: 150,
        alignSelf: 'center'
    },
    hovSignImage: { 
        width: 60, 
        height: 50, 
        marginBottom: -5 
    },
    carPassingImage: { 
        width: 150, 
        height: 105 
    }
});

export default contentItems;
