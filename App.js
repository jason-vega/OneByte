import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AddEventScreen } from './screens/AddEventScreen';
import { DetailScreen } from './screens/DetailScreen';
import * as firebase from 'firebase';
import config from './auth.json';

firebase.initializeApp(config);

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    AddEvent: AddEventScreen,
    Details: DetailScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
