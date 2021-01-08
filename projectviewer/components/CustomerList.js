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
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewCustomerForm from './NewCustomerForm.js';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import filter from 'lodash.filter';
import { CheckBox } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

let retrieved = false;
let tempItem = {};
let items = [];

const styles = StyleSheet.create({
  row: {
    padding: 2,
  },
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
  image: {
    width: 1000,
    height: 500,
    resizeMode: 'stretch',
  },
});

  let retrieveData = async () => {
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
        if(!item.key.startsWith('PROJECT'))
        {
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
        let stateItem = tempItem.firstName + ' ' + tempItem.lastName;
        }
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
      nameData: [],
      query: '',
      checked: false,
    };
  }
  componentDidMount = () => {
    retrieveData();
  };

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = filter(this.state.nameData, (user) => {
      return this.contains(user, formattedQuery);
    });
    this.setState({ data, query: text });
  };

  contains = ({ name }, query) => {
    const { first, last } = name;
    if (first.includes(query) || last.includes(query)) {
      return true;
    }
    return false;
  };

  renderItem = ({ item }) => (
    <ListItem
      style={styles.row}
      key={item.project}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      linearGradientProps={{
        colors: ['#FF9800', '#F44336'],
        start: { x: 1, y: 0 },
        end: { x: 0.2, y: 0 },
      }}
      bottomDivider>
      <ListItem.Content>
        <ListItem.Title style={{ color: 'white' }}>
          {item.lastName + ', ' + item.firstName}
        </ListItem.Title>
        <ListItem.Subtitle style={{ color: 'white' }}>
          {item.phoneNumber}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={{ color: 'white' }}>
          {item.address}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.CheckBox
      uncheckedIcon={<Ionicons name={'ios-trash'} size={'25'} color={'white'} />}
      uncheckedColor='clear'
      checkedIcon='add'
      checkedColor='clear'
      checked={this.state.checked}
      onPress={() => {
        Alert.alert(
          "Delete Item",
          "Are you sure you want to delete the customer?",
          [
            {
              text: "Cancel",
              onPress: () => console.log('cancel'),
            },
            {
              text: "OK", 
              onPress: () => {
                let idx = items.indexOf(item)
                items.splice(idx, 1);
                AsyncStorage.removeItem(item.project)
                this.setState({cleared: true})
              }
            }
          ]
        );
        
      }}
       />
    </ListItem>
  );

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
    this.setState({ cleared: false, nameData: [] });
  };

  render() {
    return (
      <View
        style={styles.container}
      >
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
        <FlatList
          style={styles.row}
          data={items}
          renderItem={this.renderItem}
          extraData={this.state}
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
