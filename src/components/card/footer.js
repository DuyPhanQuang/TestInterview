import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
    }
});

class Footer extends React.PureComponent {
    state = {

    };

    render() {
        return(
            <View style={styles.container}>
                <Text>dasdsadsadsa</Text>
            </View>
        );
    };
};

export default Footer;
