import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import SplashScreen from '../screens/SplashScreen/Splash';
import HomeScreen from '../screens/HomeScreen/Home';
import TeamDetailsScreen from '../screens/TeamDetailsScreen/TeamDetails';



export default class AppNavigator extends Component {

    render() {

        const MainNavigatorNav = createStackNavigator({
            SplashScreen: {
                screen: SplashScreen,
                navigationOptions: {
                    headerShown: false
                }
            },
            HomeScreen: {
                screen: HomeScreen,
            },
            TeamDetailsScreen: {
                screen: TeamDetailsScreen,
            },
        });

        const RootNavigator = createAppContainer(MainNavigatorNav);
        return <RootNavigator />;
    }
}

