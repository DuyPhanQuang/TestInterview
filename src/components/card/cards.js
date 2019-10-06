import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {
    windowWidth,
    windowHeight
} from '../../common';
import {
    CardItem
} from '../../components';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 10,
        zIndex: 99,
    }
});

class Cards extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            profiles: props.profiles || []
        };
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log('willReceiveProp--props:', nextProps);
        this.setState({
            profiles: nextProps.profiles
        });
    };

    render() {
        // const { profiles: [lastProfile, ...profiles] } = this.state;
        // console.log('profile:', profiles);
        const {
            profiles
        } = this.state;
        return(
            <View style={styles.container}>
                {
                    profiles.map((profile, index) => (
                        <CardItem
                            key={index}
                            index={index}
                            profile={profile}
                        />
                    ))
                }
            </View>
        );
    };
};

Cards.propTypes = {
    profiles: PropTypes.array
};

export default Cards;
