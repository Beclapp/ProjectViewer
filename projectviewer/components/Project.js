import * as React from 'react';
import { Text, View, Button } from 'react-native';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      priceList: [],
    }
  }

  render() {
    return (
      <View>
      <Text>{this.name}</Text>
      </View>
    );
  }
}