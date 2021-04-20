import React, { Component } from 'react';
import { StatusBar, View, StyleSheet, FlatList, Text, Dimensions } from 'react-native';
import { blue, darkBlue, gray, white } from '../../assets/colors/index'
import GameBox from '../../components/GameBox'
import { Spinner, Button } from 'native-base';
import DropDownPicker from 'react-native-dropdown-picker';


var config = require('../../server/config');


export default class Games extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <Text style={styles.headerTitle}>{"Games"}</Text>,
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
            isFetching: false,
            games: [],
            teams: [],
            fromYear: '2015',
            toYear: '2018',
            from: [
                { label: '2015', value: '2015' },
                { label: '2016', value: '2016' },
                { label: '2017', value: '2017' },
                { label: '2018', value: '2018' },
                { label: '2019', value: '2019' },
                { label: '2020', value: '2020' },
            ],
            to: [
                { label: '2015', value: '2015' },
                { label: '2016', value: '2016' },
                { label: '2017', value: '2017' },
                { label: '2018', value: '2018' },
                { label: '2019', value: '2019' },
                { label: '2020', value: '2020' },
            ],

        };
    }
    async UNSAFE_componentWillMount() {
        this.getGames()
        this.getTeams()
    }
    async getTeams() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'teams');
            let res = await response.json();
            res.data.map((val) => {
                var x = {
                    label: val.full_name,
                    value: val.id
                };
                this.state.teams.push(x)

            })
            this.setState({ showProgress: false, });
        } catch (error) {
            console.log('there is error ..', error)
        }
    }
    async getGames() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'games');
            let res = await response.json();
            this.setState({ showProgress: false, games: res.data, isFetching: false });
        } catch (error) {
            console.log('there is error ..', error)
        }
    }
    async filter() {
        this.setState({ showProgress: true })
        try {
            let response = await fetch(config.DOMAIN + 'games?seasons[]=' + this.state.fromYear + '&seasons[]=' + this.state.toYear + '&team_ids[]=' + this.state.teamSelected);
            let res = await response.json();
            this.setState({ showProgress: false, games: res.data, });
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
                data={this.state.games}
                renderItem={this.renderGameItems}
                keyExtractor={item => item.id}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}
                ListEmptyComponent={this.renderEmpty}
            />
        );
    };
    renderGameItems = ({ item, index }) => {
        return (
            <GameBox
                data={item}
                nav={this.props.navigation}
            />
        );
    };
    onRefresh() {
        this.setState({ isFetching: true }, () => {
            this.getGames();
        });
    }
    renderEmpty = () => {
        return (
            <View>
                {!this.state.showProgress &&
                    <Text>
                        {"There is no games"}
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
                <View style={{ flexDirection: 'row' }}>
                    <DropDownPicker
                        items={this.state.from}
                        defaultValue={this.state.fromYear}
                        containerStyle={{ height: 40, width: width * 0.2 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            fromYear: item.value
                        })}
                    />
                    <DropDownPicker
                        items={this.state.to}
                        defaultValue={this.state.toYear}
                        containerStyle={{ height: 40, width: width * 0.2 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            toYear: item.value
                        })}
                    />
                    <DropDownPicker
                        items={this.state.teams}
                        containerStyle={{ height: 40, width: width * 0.4 }}
                        style={{ backgroundColor: '#fafafa' }}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={item => this.setState({
                            teamSelected: item.value
                        })}
                    />
                    <Button style={styles.btn} onPress={() => this.filter()}>
                        <Text>{"Filter"}</Text>
                    </Button>
                </View>

                {!this.state.showProgress && this.renderTeams()}
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
    btn: {
        alignSelf: 'center',
        width: width * 0.2,
        backgroundColor: darkBlue,
        justifyContent: 'center',
        height: 40,
    }
})