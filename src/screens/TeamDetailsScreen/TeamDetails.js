import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { blue, darkBlue, gray, white } from '../../assets/colors/index'
import { Spinner } from 'native-base';


var config = require('../../server/config');


export default class TeamDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text style={styles.headerTitle}>{"Team Details"}</Text>,
            headerStyle: {
                backgroundColor: darkBlue,
                elevation: 0,
                shadowColor: 'transparent',
            },
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            showDiv: false,
            teamDetails: [],
            teamPlayers: [],
            teamId: this.props.navigation.state.params.id,

        };
    }
    async UNSAFE_componentWillMount() {
        this.getTeamDetails()
        this.getPlayers()
    }
    async getTeamDetails() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'teams/' + this.state.teamId);
            let res = await response.json();
            this.setState({ showProgress: false, teamDetails: res, });
        } catch (error) {
            console.log('there is error ..', error)
        }
    }
    async getPlayers() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'players');
            let res = await response.json();

            res.data.map((val) => {
                if (val.team.id == this.state.teamId) {
                    this.state.teamPlayers.push(val)
                }
            })
            this.setState({ showProgress: false, });
        } catch (error) {
            console.log('there is error ..', error)
        }
    }
    renderLoading() {
        if (this.state.showProgress) {
            return <Spinner color={darkBlue} style={styles.loader} />
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={darkBlue} />
                {this.renderLoading()}
                {!this.state.showProgress && <View style={styles.view}>
                    <Text>{"Team Name : " + this.state.teamDetails.full_name}</Text>
                    <Text>{"Team Abbreviation : " + this.state.teamDetails.abbreviation}</Text>
                    <Text>{"Team City : " + this.state.teamDetails.city}</Text>
                    <Text>{"Team Conference : " + this.state.teamDetails.conference}</Text>
                    <Text>{"Team Division : " + this.state.teamDetails.division}</Text>
                    <Text>{"Team Players : "}</Text>
                    {this.state.teamPlayers.map((val) => {
                        return <TouchableOpacity onPress={() => this.setState({ showDiv: !this.state.showDiv })} >
                            <View style={styles.playersView}>
                                <Text>{"Name : " + val.first_name + " " + val.last_name}</Text>
                                {this.state.showDiv && <View>
                                    <Text>{"height_feet : " + val.height_feet}</Text>
                                    <Text>{"height_inches : " + val.height_inches}</Text>
                                    <Text>{"position : " + val.position}</Text>
                                    <Text>{"weight_pounds : " + val.weight_pounds}</Text>
                                </View>}
                            </View>
                        </TouchableOpacity>
                    })}
                </View>}
            </View>
        );
    }
}

const { width: width, height: height } = Dimensions.get('window');
const styles = StyleSheet.create({
    headerTitle: {
        color: white,
        fontSize: 18
    },
    container: {
        flex: 1,
        backgroundColor: blue
    },
    loader: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: gray,
        width: 70,
        height: 70,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        left: '50%',
        marginLeft: -35,
        top: '50%',
        bottom: 0,
        marginTop: -35,
        zIndex: 10,
    },
    view: {
        width: width * 0.9,
        alignSelf: 'center',
        backgroundColor: white,
        borderRadius: 5,
        padding: 10,
        margin: 10
    },
    playersView: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderColor: darkBlue
    }
})