import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {
    CardItem
} from '../../components';
import {
    PanGestureHandler,
    State
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {
    windowWidth,
    windowHeight
} from '../../common';
import _ from 'lodash';

const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth = windowWidth * Math.sin(toRadians(90 - 15)) +
    windowHeight * Math.sin(toRadians(15));
const {
    add,
    multiply,
    neq,
    spring,
    cond,
    eq,
    event,
    lessThan,
    greaterThan,
    and,
    call,
    set,
    clockRunning,
    startClock,
    stopClock,
    Clock,
    Value,
    concat,
    interpolate,
    Extrapolate,
} = Animated;

function runSpring(clock, value, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    };

    const config = {
        damping: 20,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 0.5,
        toValue: new Value(0),
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, 0),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ];
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        margin: 10,
        zIndex: 100,
    }
});

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: props.profiles || [],
            index: props.index || 0
        };
        this.translationX = new Value(0);
        this.translationY = new Value(0);
        this.velocityX = new Value(0);
        this.offsetY = new Value(0);
        this.offsetX = new Value(0);
        this.gestureState = new Value(State.UNDETERMINED);
        this.onGestureEvent = event(
            [
                {
                    nativeEvent: {
                        translationX: this.translationX,
                        translationY: this.translationY,
                        velocityX: this.velocityX,
                        state: this.gestureState,
                    },
                },
            ],
            { useNativeDriver: true },
        );
        this.init();
    };

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (!_.isEqual(this.state.profiles, nextProps.profiles)) {
            this.setState({
                profiles: nextProps.profiles
            });
        };
        if (!_.isEqual(this.state.index, nextProps.index)) {
            this.setState({
                index: nextProps.index
            });
        };
    };

    init = () => {
        const clockX = new Clock();
        const clockY = new Clock();
        const {
            translationX, translationY, velocityX, gestureState, offsetY, offsetX,
        } = this;
        gestureState.setValue(State.UNDETERMINED);
        translationX.setValue(0);
        translationY.setValue(0);
        velocityX.setValue(0);
        offsetY.setValue(0);
        offsetX.setValue(0);

        const finalTranslateX = add(translationX, multiply(0.2, velocityX));
        const translationThreshold = windowWidth / 4;
        const snapPoint = cond(
            lessThan(finalTranslateX, -translationThreshold),
            -rotatedWidth,
            cond(greaterThan(finalTranslateX, translationThreshold), rotatedWidth, 0),
        );
        // TODO: handle case where the user drags the card again before the spring animation finished
        this.translateY = cond(
            eq(gestureState, State.END),
            [
                set(translationY, runSpring(clockY, translationY, 0)),
                set(offsetY, translationY),
                translationY,
            ],
            cond(eq(gestureState, State.BEGAN), [stopClock(clockY), translationY], translationY),
        );
        this.translateX = cond(
            eq(gestureState, State.END),
            [
                set(translationX, runSpring(clockX, translationX, snapPoint)),
                set(offsetX, translationX),
                cond(and(eq(clockRunning(clockX), 0), neq(translationX, 0)), [
                    call([translationX], this.swiped),
                ]),
                translationX,
            ],
            cond(eq(gestureState, State.BEGAN), [stopClock(clockX), translationX], translationX),
        );
    };

    swiped = ([translationX]) => {
        const {
            onSwipedLeft,
            onSwipedRight
        } = this.props;
        if (translationX < 0) {
            onSwipedLeft && onSwipedLeft();
        };
        if (translationX > 0) {
            onSwipedRight && onSwipedRight();
        };
        this.init();
    };

    render() {
        const { onGestureEvent, translateX, translateY } = this;
        const { profiles, index } = this.state;
        const rotateZ = concat(
            interpolate(translateX, {
                inputRange: [-windowWidth / 2, windowWidth / 2],
                outputRange: [15, -15],
                extrapolate: Extrapolate.CLAMP,
            }),
            "deg",
        );
        const style = {
            ...StyleSheet.absoluteFillObject,
            zIndex: 900,
            transform: [
                { translateX },
                { translateY },
                { rotateZ },
            ],
        };
        return(
            <View style={styles.container}>
                <PanGestureHandler
                    onHandlerStateChange={onGestureEvent}
                    {...{ onGestureEvent }}
                >

                    <Animated.View {...{ style }}>
                        <CardItem profile={profiles[index]} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        );
    };
};

Cards.propTypes = {
    profiles: PropTypes.array,
    index: PropTypes.number,
    onSwipedLeft: PropTypes.func,
    onSwipedRight: PropTypes.func
};

export default Cards;
