import React from 'react'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack';

import HomePage from './screens/HomePage'
import SecondScreen from './screens/SecondScreen'

const HomePageStack = createStackNavigator({HomePage})
HomePageStack.navigationOptions={
    tabBarLabel:'Trang Chủ'
}

const SecondPageStack = createStackNavigator({SecondScreen})
SecondPageStack.navigationOptions={
    tabBarLabel:'Dự Báo'
}

const AppNavigator = createBottomTabNavigator({
    HomePageStack,
    SecondPageStack
},
{
    tabBarOptions:{
        labelStyle:{
            fontSize:16
        }
    }
})
export default AppNavigator