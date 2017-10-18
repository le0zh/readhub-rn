import React from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

import { SCREEN_WIDTH } from '../../utils';

export default class EnterpriseItem extends React.PureComponent {
  render() {
    const { name, desc } = this.props;

    return (
      <View style={styles.card}>
        <Image style={styles.logo} source={{ uri: 'https://via.placeholder.com/100x100' }} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.desc} numberOfLines={2}>
            {desc}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  name: {
    color: '#333',
  },
  desc: {
    color: '#aaa',
  },
  logo: {
    height: 80,
    width: 80,
    marginRight: 10,
  },
});
