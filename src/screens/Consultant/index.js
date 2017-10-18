import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

export default class ConsultantPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Consultant</Text>
        <Image style={{ width: 350, height: 150 }} source={{ uri: 'https://via.placeholder.com/350x150' }} />
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
