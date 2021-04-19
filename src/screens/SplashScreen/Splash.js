import React, { Component } from 'react';
import { StatusBar, View, ImageBackground, StyleSheet, Text } from 'react-native';
import { white, darkBlue } from '../../assets/colors/index'




export default class Splash extends Component {

    async UNSAFE_componentWillMount() {
        this.loginInterval = setInterval(() => {
            this.renderLoading();
        }, 1000);
    }

    async renderLoading() {
        clearInterval(this.loginInterval);
        this.props.navigation.navigate('HomeScreen');

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={darkBlue} />
                <ImageBackground source={require('../SplashScreen/Splash.png')} style={styles.image}>
                    <Text style={styles.txt}>{"Welcome"}</Text>
                </ImageBackground>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        color: white,
        fontSize: 25
    }
})