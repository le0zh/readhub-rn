import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import styled from 'styled-components';

import Card from './Card';

const Wrapper = styled.View`
  flex-grow: 1;
  flex-direction: column;
  background-color: #eeeeed;
  justify-content: flex-start;
  align-items: stretch;
`;

const List = styled.FlatList`
  flex-grow: 1;
`;

const Separator = styled.View`
  height: 1px;
  flex-grow: 1;
  background-color: #aaaaab4d;
`;

const ITEM_HEIGHT = 100;
const ITEM_HEIGHT_EXPAND = 400;

export default class Topics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        { id: 1, title: 'title1' },
        { id: 2, title: 'title2' },
        { id: 3, title: 'title3' },
        { id: 4, title: 'title4' },
        { id: 5, title: 'title5' },
        { id: 6, title: 'title6' },
        { id: 7, title: 'title7' },
        { id: 8, title: 'title8' },
        { id: 9, title: 'title9' },
        { id: 10, title: 'title10' },
      ],
    };

    this.selectedIndex = -1;
  }

  onPress = () => {
    this.props.navigator.push({
      screen: 'app.Menus',
      navigatorStyle: {
        navBarBackgroundColor: '#37363B',
        statusBarTextColorScheme: 'light',
        disabledBackGesture: false,
        navBarLeftButtonColor: '#EEEEED',
        navBarButtonColor: '#EEEEED',
      },
    });
  };

  _keyExtractor = (item, index) => item.title;

  _onCardPress = index => {
    this.list.scrollToIndex({ index: index, viewOffset: -10, viewPosition: 0 });
  };

  _getItemLayout = (data, index) => {
    const height = this.state.selectedIndex === index ? ITEM_HEIGHT_EXPAND : ITEM_HEIGHT;
    return { length: height, offset: height * index, index };
  };

  _renderItem = ({ item, index }) => (
    <Card id={item.id} onPress={() => this._onCardPress(index)} title={item.title + '_' + index} />
  );

  render() {
    return (
      <Wrapper>
        <FlatList
          scrollEnabled={true}
          ref={com => (this.list = com)}
          data={this.state.data}
          getItemLayout={this._getItemLayout}
          ItemSeparatorComponent={() => <Separator />}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
