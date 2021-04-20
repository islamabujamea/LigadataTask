import React, { Component } from 'react';
import { StatusBar, View, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { white, darkBlue } from '../../assets/colors/index'




export default class SelectOption extends Component {



    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={darkBlue} />
                <ImageBackground source={require('../SelectOptionScreen/Splash.png')} style={styles.image}>

                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("HomeScreen")}>
                            <Text style={styles.txt}>{"Teams"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.view}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("GamesScreen")}>
                            <Text style={styles.txt}>{"Games"}</Text>
                        </TouchableOpacity>
                    </View>
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
        color: darkBlue,
        fontSize: 25
    },
    view: {
        padding: 20,
        margin:20,
        backgroundColor: white
    }
})