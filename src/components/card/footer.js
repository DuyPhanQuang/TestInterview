import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 16,
    },
    touchView: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'red',
        marginHorizontal: 15
    },
    buttonView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#FFF'
    }
});

class Footer extends React.PureComponent {
    state = {

    };

    render() {
        const {
            onSeeMyFavorite,
            disabledButtonSee
        } = this.props;
        return(
            <View style={styles.container}>
                <TouchableOpacity
                    disabled={disabledButtonSee}
                    style={[styles.touchView, { backgroundColor: '#FFF' }]}
                    onPress={onSeeMyFavorite}
                >
                    <View style={styles.buttonView}>
                        <Text style={[styles.text, { color: '#000' }]}>
                            See
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
};

Footer.propTypes = {
    onSeeMyFavorite: PropTypes.func,
    disabledButtonSee: PropTypes.bool
};

export default Footer;
