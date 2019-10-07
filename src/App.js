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
    Text,
    ActivityIndicator
} from 'react-native';
import {
    Cards,
    Footer
} from './components';
import {UserApi} from './api';
import {
    pushElementToArray,
    MY_FAVORITE
} from './utils';
import _ from 'lodash';
import AsyncStorage from '@react-native-community/async-storage';

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
    },
    favoriteView: {
        flexDirection: 'row',
        paddingHorizontal: 20
    }
});

const n = 5;

class App extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            index: 0,
            loading: true,
            myFavoritePeople: [],
            isShowListFavorite: false,
            disabledButtonSee: false
        };
    };

    componentDidMount() {
        this._fetchData();
        this._getDataFromLocalStorage();
    };

    _fetchData = async () => {
        const {
            profiles
        } = this.state;
        let arr = [];
        for (let i = 0; i < n; i++) {
            const response = await UserApi.getRandomUserInformation();
            arr = await pushElementToArray({ arr: profiles, item: response });
            if (!_.isEmpty(response)) {
                this.setState({
                    loading: false,
                });
            };
        };
        this.setState({
            profiles: arr
        });
    };

    _getDataFromLocalStorage = async () => {
        const getData = await AsyncStorage.getItem(MY_FAVORITE);
        if (!_.isEmpty(JSON.parse(getData))) {
            this.setState({
                myFavoritePeople: JSON.parse(getData)
            });
        } else {
            this.setState({
                disabledButtonSee: true
            });
        };
    };

    _update = ({ type }) => {
        const {
            profiles,
            index
        } = this.state;
        this.setState({
            index: this.state.index + 1
        }, () => {
            if (profiles.length - index === 2) {
                this._fetchData();
            };
            switch (type) {
                case "right":
                    this._onAddFavorite();
                    break;
            };
        });
    };

    _onSwipedLeft = () => {
        this._update({ type: 'left' });
    };

    _onSwipedRight = () => {
        this._update({ type: 'right' });
    };

    _onAddFavorite = async () => {
        const {
            profiles,
            index,
            myFavoritePeople
        } = this.state;
        let temp = [];
        if (_.isEmpty(myFavoritePeople)) {
            temp = await pushElementToArray({ arr: temp, item: profiles[index] });
            await AsyncStorage.setItem(MY_FAVORITE, JSON.stringify(temp));
            this.setState({
                myFavoritePeople: temp,
                isShowListFavorite: true
            });
        } else {
            temp = await pushElementToArray({ arr: myFavoritePeople, item: profiles[index] });
            await AsyncStorage.setItem(MY_FAVORITE, JSON.stringify(temp));
            this.setState({
                myFavoritePeople: temp
            });
        };
        alert('Add user to your list favorite success!');
    };

    _onSeeMyFavorite = () => {
        this.setState({
            isShowListFavorite: true
        });
    };

    renderListFavorite = () => {
        const {
            isShowListFavorite
        } = this.state;
        if (!isShowListFavorite) {
            return null;
        }
        return this.state.myFavoritePeople.map((result, index) =>
            (<View
                key={index}
            >
                <Text style={{ color: '#FFF' }}>
                    {result.fullName}
                </Text>
            </View>)
        );
    };

    render() {
        const {
            profiles,
            index,
            loading,
            disabledButtonSee
        } = this.state;
        return(
            <View style={styles.container}>
                {
                    !loading ?
                        <View style={styles.profileView}>
                            <View style={styles.favoriteView}>
                                {this.renderListFavorite()}
                            </View>
                            <Cards
                                profiles={profiles}
                                index={index}
                                onSwipedLeft={this._onSwipedLeft}
                                onSwipedRight={this._onSwipedRight}
                            />
                            <Footer
                                disabledButtonSee={disabledButtonSee}
                                onSeeMyFavorite={this._onSeeMyFavorite}
                            />
                        </View>
                        :
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
