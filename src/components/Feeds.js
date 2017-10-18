import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  InteractionManager,
} from 'react-native';

import { SCREEN_WIDTH } from '../utils/';

export default class Feeds extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: false,
      page: 0,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  removeOne = predicate => {
    const newData = this.state.data.filter((item, index) => {
      return !predicate(item);
    });

    this.setState({
      data: newData,
    });
  };

  _renderFooter = () => {
    if (!this.props.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _renderItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  render() {
    if (!this.state.loading && this.state.data.length === 0) {
      return (
        <View style={styles.noContent}>
          <Text style={{ fontStyle: 'italic' }}>NO DATA</Text>
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        <FlatList
          ref={view => (this.flatList = view)}
          data={this.props.data}
          keyExtractor={this.props.keyExtractor}
          renderItem={this.props.renderItem}
          ListFooterComponent={this._renderFooter}
          onEndReachedThreshold={30}
          refreshing={this.state.refreshing}
          onEndReached={this._loadMore}
          onRefresh={this._handleRefresh}
          getItemLayout={this.props.getItemLayout}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  noContent: {
    width: SCREEN_WIDTH,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  itemSeparator: {
    height: 35,
    width: SCREEN_WIDTH,
    backgroundColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e9e9e9',
    // elevation: 5,
  },
});
