import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import EnterpriseItem from './EnterpriseItem';
import logger from '../../utils/logger';

class EnterprisePage extends Component {
  static navigatorStyle = {
    navBarHideOnScroll: false,
    navBarBackgroundColor: '#3F51B5',
    navBarTextColor: '#fff',
    statusBarColor: '#3F51B5',
    navBarTitleTextCentered: true,
    statusBarTextColorScheme: 'light',
    // iOS only
    statusBarHideWithNavBar: true,
  };

  state = {
    refreshing: false,
    loadingMore: false,
  };

  getItemLayout = (data, index) => {
    return { length: 100, offset: 100 * index, index };
  };

  renderItem = ({ item }) => {
    return <EnterpriseItem key={item._id} {...item} />;
  };

  handleRefresh = () => {
    this.setState({ refreshing: true });

    const { dispatch } = this.props;

    dispatch({
      type: 'enterprise/refresh',
      page: 1,
    }).then(() => {
      this.setState({ refreshing: false });
    });
  };

  renderFooter = () => {
    if (!this.state.loadingMore) return null;

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

  page = 1;

  loadMore = () => {
    const { dispatch, enterprise } = this.props;

    if (enterprise.noMoreData) {
      return;
    }

    this.setState({ loadingMore: true });

    this.page++;

    logger.log('load more page: ' + this.page);

    dispatch({
      type: 'enterprise/fetchList',
      page: this.page,
    }).then(() => {
      this.setState({ loadingMore: false });
    });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <FlatList
          ref={view => (this.flatList = view)}
          data={this.props.enterprise.list}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={10}
          refreshing={this.state.refreshing}
          onEndReached={this.loadMore}
          onRefresh={this.handleRefresh}
          getItemLayout={this.getItemLayout}
        />
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

const propsSelector = state => {
  return {
    enterprise: state.enterprise,
    loading: state.loading.effects['enterprise/fetchList'],
  };
};

export default connect(propsSelector)(EnterprisePage);
