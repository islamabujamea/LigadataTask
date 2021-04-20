import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { darkBlue, white } from '../assets/colors';


export default class GameBox extends Component {
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.imgView}>
                    <Image source={require('./images/teams.jpeg')} style={styles.img} />
                </View>
                <View style={styles.TxtView}>
                    <Text>{"Home Team : " + this.props.data.home_team.full_name}</Text>
                    <Text>{"Sisitor Team : " + this.props.data.visitor_team.full_name}</Text>
                    <Text>{"Season : " + this.props.data.season}</Text>
                </View>
            </View>
        );
    }
}
// Constants
const { width: width, height: height } = Dimensions.get('window');
const styles = StyleSheet.create({
    view: {
        width: width * 0.9,
        backgroundColor: white,
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        borderWidth: 1,
        borderColor: darkBlue,
        borderStyle: 'dashed'

    },
    imgView: {
        width: width * 0.25
    },
    img: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: darkBlue,
        padding: 5
    },
    TxtView: {
        width: width * 0.6,
        padding: 5
    }
});