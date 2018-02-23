import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Button, TouchableOpacity, LayoutAnimation } from 'react-native';
import styled from 'styled-components';

const Wrapper = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const TitleText = styled.Text`
  color: #37363b;
`;

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 100,
    };
  }

  onPress = () => {
    this.props.onPress();

    LayoutAnimation.spring();

    if(this.state.height === 100){
      this.setState({height: 400});
    }

    if(this.state.height === 400){
      this.setState({height: 100});
    }
  };

  render() {
    const wrapperStyle = {
      height: this.state.height,
    };

    return (
      <TouchableOpacity onPress={this.onPress}>
        <Wrapper style={wrapperStyle}>
          <TitleText>{this.props.title}</TitleText>
        </Wrapper>
      </TouchableOpacity>
    );
  }
}
