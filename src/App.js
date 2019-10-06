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
    Text,
    ActivityIndicator
} from 'react-native';
import {
    Cards,
    Footer
} from './components';
import {UserApi} from './api';
import {
    pushElementToArray
} from './utils';
import _ from 'lodash';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#3b5998',
    },
    profileView: {
        flex: 1,
        paddingTop: 100
    },
    emptyView: {
        flex: 1,
        backgroundColor: '#3b5998',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            loading: true
        }
    };

    async componentDidMount() {
        const {
            profiles
        } = this.state;
        const response = await UserApi.getRandomUserInformation();
        const arr = await pushElementToArray({ arr: profiles, item: response });
        console.log('arr:', arr);
        if (!_.isEmpty(response)) {
            this.setState({
                loading: false,
                profiles: arr
            });
        };
    };

    render() {
        const {
            profiles,
            loading
        } = this.state;
        return(
            <View style={styles.container}>
                {
                    !loading ?
                        <View style={styles.profileView}>
                            <Cards
                                profiles={profiles}
                            />
                            <Footer

                            />
                        </View> :
                        <View style={styles.emptyView}>
                            <ActivityIndicator
                                size={"large"}
                                animating={true}
                                color={"red"}
                            />
                        </View>
                }
            </View>
        );
    };
};

export default App;
