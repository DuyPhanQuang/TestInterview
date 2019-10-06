/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import {Card} from './components';
import {UserApi} from './api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    profileView: {
        paddingTop: 100
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);
    };

    async componentDidMount() {
        const response = await UserApi.getRandomUserInformation();
        console.log('response:', response);
    };

    render() {
        return(
            <View styles={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <View style={styles.profileView}>
                    <Card />
                </View>

            </View>
        );
    };
};

export default App;
