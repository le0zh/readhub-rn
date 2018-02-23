import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class Menus extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: '#37363', 
    statusBarTextColorScheme: 'dark',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Menus</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
