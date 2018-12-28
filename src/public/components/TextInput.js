import React, { Component } from 'react';
import { View, TextInput as Input } from 'react-native';

export default class TextInput extends Component {
  render() {
    return (
      <View>
        <Input
          style={this.props.style}
          placeholder={this.props.placeholder}
          onChangeText={this.props.input.onChange}
          value={this.props.input.value}
          placeholderTextColor={this.props.placeholderColor}
          autoCapitalize="none"
          keyboardType={this.props.keyboardType}
        />
      </View>
    )
  }
}