import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, FlatList, Text } from 'react-native';
import { blue, darkBlue, gray, white } from '../../assets/colors/index'
import TeamBox from '../../components/TeamBox'
import { Spinner } from 'native-base';


var config = require('../../server/config');


export default class Home extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text style={styles.headerTitle}>{"Teams"}</Text>,
            headerStyle: {
                backgroundColor: darkBlue,
                elevation: 0,
                shadowColor: 'transparent',
            },
            headerLeft: () => null,
            headerRight: () => null
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            showProgress: false,
            isFetching: false,
            teams: []

        };
    }
    async UNSAFE_componentWillMount() {
        this.getTeams()
    }
    async getTeams() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'teams');
            let res = await response.json();
            this.setState({ showProgress: false, teams: res.data, isFetching: false });
        } catch (error) {
            console.log('there is error ..', error)
        }
    }
    renderLoading() {
        if (this.state.showProgress) {
            return <Spinner color={darkBlue} style={styles.loader} />
        }
    }
    renderTeams = () => {
        return (
            <FlatList
                data={this.state.teams}
                renderItem={this.renderTeamItems}
                keyExtractor={item => item.id}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                ListEmptyComponent={this.renderEmpty}
            />
        );
    };
    renderTeamItems = ({ item, index }) => {
        return (
            <TeamBox
                data={item}
                nav={this.props.navigation}
            />
        );
    };
    onRefresh() {
        this.setState({ isFetching: true }, () => {
            this.getTeams();
        });
    }
    renderEmpty = () => {
        return (
            <View>
                {!this.state.showProgress &&
                    <Text>
                        {"There is no teams"}
                    </Text>
                }
            </View>
        );
    };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor={darkBlue} />
                {this.renderLoading()}
                {!this.state.showProgress && this.renderTeams()}
            </View>
        );
    }
}


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
    }
})