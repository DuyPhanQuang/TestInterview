import {
    Dimensions
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export {
    windowWidth,
    windowHeight,
    screenWidth,
    screenHeight
};
