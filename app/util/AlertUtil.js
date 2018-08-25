import {Platform, Alert, AlertIOS} from 'react-native';

const simpleAlert = (title, message) =>{
    if(Platform.OS === 'android') {
        Alert.alert(
            title,
            message,
            [{text: 'OK', onPress: () => {}}]
        );
    }else if(Platform.OS === 'ios'){
        AlertIOS.alert(
            title,
            message,
            [{text: 'OK', onPress: () => {}}]
        );
    }
};

export default {
    simpleAlert,
};