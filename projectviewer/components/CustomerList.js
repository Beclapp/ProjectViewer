import React, { useState } from 'react';
import {
  Text,
  View,
  Button,
  TextInput,
  AsyncStorage,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewCustomerForm from './NewCustomerForm.js';

let retrieved = false;
let tempItem = {};
let items = [];

const styles = StyleSheet.create({
  row: { padding: 20 },
  button: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'blue',
  },
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});

const retrieveData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    let result = await AsyncStorage.multiGet(keys);
    result = result.sort();
    items = [];
    for (const element of result) {
      let item = {
        key: element[0],
        text: element[1],
      };
      item.text = JSON.parse(item.text);
      item.text.phoneNumber =
        item.text.phoneNumber.substring(0, 3) +
        '-' +
        item.text.phoneNumber.substring(3, 6) +
        '-' +
        item.text.phoneNumber.substring(6, item.text.phoneNumber.length);
      tempItem = {
        project: item.key,
        lastName: item.text.lastName,
        firstName: item.text.firstName,
        phoneNumber: item.text.phoneNumber,
        address: item.text.address,
      };
      items.push(tempItem);
    }
    retrieved = true;
  } catch (error) {
    console.log(error);
  }
};

export default class CustomerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cleared: false,
      addCustomer: false,
      submitted: false,
    };
  }
  componentDidMount = () => {
    retrieveData();
  };

  updateState = () => {
    this.setState({ addCustomer: false });
    let count = 0;
    retrieveData().then(this.setState({ cleared: true }));
    if (retrieved) {
      setTimeout(this.update, 750);
    }
    retrieved = false;
  };

  update = () => {
    this.setState({ cleared: false });
  };

  exitState = () => {
    this.setState({ addCustomer: false });
    this.setState({ cleared: false });
    retrieved = false;
  };

  clearData = () => {
    AsyncStorage.clear();
    items = [];
    this.setState({ cleared: false });
  };

  render() {
    return (
      <View
        style={styles.container
          //{
          //padding: 20,
          //flex: 1,
          //justifyContent: 'center',
          //alignItems: 'center',
          //}
        }>
          {!this.state.addCustomer && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.setState({ addCustomer: true });
              }}>
              <Text style={styles.text}>Add Customer</Text>
            </TouchableOpacity>
          )}
 
        {this.state.addCustomer && (
          <NewCustomerForm update={this.updateState} exit={this.exitState} />
        )}
        <List
          data={items}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text>{item.lastName + ', ' + item.firstName}</Text>
              <Text>{item.phoneNumber}</Text>
              <Text>{item.address}</Text>
            </View>
          )}
          keyExtractor={(item) => item.project}
        />
        <Button
          title="clear"
          onPress={() => {
            this.clearData();
          }}
        />
      </View>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={this.props.renderItem}
        keyExtractor={this.props.keyExtractor}
      />
    );
  }
}
