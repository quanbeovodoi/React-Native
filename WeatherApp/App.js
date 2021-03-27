import React from 'react';
import {View,StyleSheet} from 'react-native'
import { createAppContainer } from 'react-navigation';
import AppNavigator from './AppNavigator';

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppContainer/> 
  }
}

const styles = StyleSheet.create({
  mainContent:{
    paddingTop:100,
    paddingHorizontal:10,
    backgroundColor:'#2ecc71'
  }
})