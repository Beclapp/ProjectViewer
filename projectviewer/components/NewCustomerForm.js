import React, { useState } from 'react';
import { Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CustomerList, { updateData } from './CustomerList.js';

let firstName = '';
let lastName = '';
let phoneNumber = '';
let address = '';
let formSubmitted = false;

const SubmitForm = async () => {
  formSubmitted = true;
  let key = lastName.trim() + firstName.substring(0, 2);
  let content = {
    project: key,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    address: address,
  };
  try {
    await AsyncStorage.setItem(key, JSON.stringify(content));
  } catch (error) {
    alert(error);
  }
  key = '';
  content = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  address = '';
};

export default class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastName: '',
      firstName: '',
      phoneNumber: '',
      address: '',
    };
  }

  Submitted = () => {
    this.props.update();
  };

  Exited = () => {
    this.props.exit();
  };

  render() {
    return (
      <View>
        <Button
          title="Cancel"
          onPress={() => {
            this.Exited();
          }}
        />
        <TextInput
          style={formstyle}
          autoCorrect={'false'}
          value={this.state.firstName}
          placeholder="First Name..."
          onChangeText={(text) => {
            this.setState({ firstName: text });
            firstName = text;
          }}
        />
        <TextInput
          style={formstyle}
          autoCorrect={'false'}
          value={this.state.lastName}
          placeholder="Last Name..."
          onChangeText={(text) => {
            this.setState({ lastName: text });
            lastName = text;
          }}
        />
        <TextInput
          style={formstyle}
          keyboardType={'number-pad'}
          value={this.state.phoneNumber}
          placeholder="Phone Number..."
          onChangeText={(text) => {
            this.setState({ phoneNumber: text });
            phoneNumber = text;
          }}
        />
        <TextInput
          style={formstyle}
          value={this.state.address}
          placeholder="Address..."
          onChangeText={(text) => {
            this.setState({ address: text });
            address = text;
          }}
        />
        <Button
          title="Submit"
          onPress={() => {
            if (firstName.length === 0 || lastName.length === 0) {
              alert('Customer must have a name');
            } else {
              SubmitForm();
              this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
              });
              this.Submitted();
            }
          }}
        />
      </View>
    );
  }
}
const formstyle = {
  padding: '1px',
  textAlign: 'center',
  align: 'center',
  margin: 12,
  borderColor: 'black',
  borderWidth: 1,
  height: 40,
  width: 350,
};
