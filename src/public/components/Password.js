import React, { Component } from 'react';
import { View, TextInput as Input } from 'react-native';

export default class Password extends Component {
  render() {
    console.log(this.props)
    return (
      <View>
        <Input
          style={this.props.style}
          placeholder={this.props.placeholder}
          onChangeText={this.props.input.onChange}
          value={this.props.input.value}
          secureTextEntry={true}
          placeholderTextColor={this.props.placeholderColor}
        />
      </View>
    )
  }
}