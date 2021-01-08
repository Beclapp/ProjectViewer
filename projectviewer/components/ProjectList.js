import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  buildView = () => {
    return this.state.items.map((item) => {
      return (
        <TouchableOpacity
        onPress={() => {
          console.log('Pressed')
        }}
        >
          <Text>{item.name.name}</Text>
        </TouchableOpacity>
      );
    });
  };

  retrieveData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let result = await AsyncStorage.multiGet(keys);
      for (const element of result) {
        let item = {
          key: element[0],
          name: element[1],
        };
        if (!item.key.startsWith('PROJECT')) {
        } else {
          item.name = JSON.parse(item.name);
          let tempItem = {
            name: item.name,
          };
          let joined = this.state.items;
          joined.push(tempItem);
          this.setState({ items: joined });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View>
        <Button
          title="refresh"
          onPress={() => {
            this.retrieveData();
          }}
        />
        <Button
          title="clear"
          onPress={() => {
            AsyncStorage.clear();
            this.setState({ items: [] });
          }}
        />
        {this.buildView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  header: {
    padding: 15,
    marginTop: 0,
  },
  button: {
    flexDirection: 'column',
    flex: 1,
  },
});
