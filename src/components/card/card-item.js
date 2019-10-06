import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import images from '../../assets';

const styles = StyleSheet.create({
    container: {

    },
    cardView: {
        position: 'absolute',
        backgroundColor: '#F9F9F9',
        left: 10,
        top: 20,
        right: 10,
        bottom: 20,
        borderRadius: 3,
    },
    headerView: {
        flex: 1,
    },
    contentView: {
        flex: 2,
        backgroundColor: '#FFF',
        borderTopWidth: 2,
        borderTopColor: '#e2e2e2',
        alignItems: 'center'
    },
    lineView: {
        height: 2,
        backgroundColor: '#E2E2E2'
    },
    avatarView: {
        position: 'absolute',
    },
    title: {
        paddingTop: 80,
        fontSize: 18,
        color: '#A1A1A1'
    },
    address: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000'
    },
    listButtonView: {
        flexDirection: 'row',
        paddingTop: 25,
        paddingHorizontal: 10
    }
});

class CardItem extends React.PureComponent {
    state = {
        topValue: 0,
        leftValue: 0,
        imageWidth: 100,
        imageHeight: 100,
        borderRadiusValue: 100,
        data: this.props.profile.address || "",
        title: 'My address is'
    };

    _onLayout = ({ nativeEvent }) => {
        this._headerView &&
        this._headerView.measure((x, y, width, height, pageX, pageY) => {
            this.setState({
                topValue: height - (this.state.imageHeight * 2 / 3),
                leftValue: (width / 2) - this.state.imageWidth / 2
            });
        });
    };

    onPressButton = type => () => {
        const {
            profile
        } = this.props;
        switch (type) {
            case "user":
                this.setState({
                    data: profile.fullName,
                    title: 'My name is'
                });
                break;
            case "dob":
                this.setState({
                    data: profile.dob,
                    title: 'My dob is'
                });
                break;
            case "location":
                this.setState({
                    data: profile.address,
                    title: 'My address is'
                });
                break;
            case "phone":
                this.setState({
                    data: profile.phone,
                    title: 'My phone is'
                });
                break;
            case "password":
                this.setState({
                    data: profile.password,
                    title: 'My password is'
                });
                break;
        };
    };

    render() {
        const {
            profile,
            index
        } = this.props;
        const {
            imageWidth,
            imageHeight,
            topValue,
            leftValue,
            borderRadiusValue,
            data,
            title
        } = this.state;
        return(
            <View
                key={index}
                style={[StyleSheet.absoluteFill, styles.container]}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#2D2E32'
                    }}
                />
                <View
                    style={{
                        flex: 3,
                        backgroundColor: '#f9f9f9'
                    }}
                />
                <View style={styles.cardView}>
                    <View
                        ref={c => this._headerView = c}
                        onLayout={this._onLayout}
                        style={styles.headerView}
                    />
                    <View style={styles.contentView}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <Text style={styles.address}>
                            {data}
                        </Text>
                        <View style={styles.listButtonView}>
                            <TouchableOpacity
                                onPress={this.onPressButton('user')}
                                style={{
                                    marginHorizontal: 10
                                }}
                            >
                                <Image
                                    source={images.username}
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }}
                                    // tintColor={"#00b251"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onPressButton('dob')}
                                style={{
                                    marginHorizontal: 10
                                }}
                            >
                                <Image
                                    source={images.dob}
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }}
                                    // tintColor={"#00b251"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onPressButton('location')}
                                style={{
                                    marginHorizontal: 10
                                }}
                            >
                                <Image
                                    source={images.location}
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }}
                                    // tintColor={"#00b251"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onPressButton('phone')}
                                style={{
                                    marginHorizontal: 10
                                }}
                            >
                                <Image
                                    source={images.phone}
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }}
                                    // tintColor={"#00b251"}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.onPressButton('password')}
                                style={{
                                    marginHorizontal: 10
                                }}
                            >
                                <Image
                                    source={images.password}
                                    style={{
                                        width: 35,
                                        height: 35,

                                    }}
                                    // tintColor={"#00b251"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={[styles.avatarView, {
                            width: imageWidth,
                            height: imageHeight,
                            top: topValue,
                            left: leftValue,
                            borderRadius: borderRadiusValue,
                            backgroundColor: '#FFF',
                            padding: 3,
                            borderColor: '#CACACA',
                            borderWidth: 1
                        }]}
                    >
                        <Image
                            source={{ uri: profile.avatar }}
                            style={{
                                flex: 1,
                                borderRadius: borderRadiusValue
                            }}
                        />
                    </View>
                </View>
            </View>
        );
    };
};

CardItem.propTypes = {
    index: PropTypes.number,
    profile: PropTypes.object
};

CardItem.defaultProps = {
};

export default CardItem;
