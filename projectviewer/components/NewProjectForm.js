import React, { useState } from 'react';
import { Text, View, Button, TextInput, AsyncStorage } from 'react-native';

let projectName = '';
let projectSubmitted = false;
let customer = '';

let submitForm = async () => {
  projectSubmitted = true;
  let key = 'PROJECT' + projectName;
  let content = {
    key: key,
    name: projectName,
    customer: customer,
  }
  try {
    await AsyncStorage.setItem(key, JSON.stringify(content));
  }
  catch (error) {
    alert(error);
  }
  projectName = '';
  customer = '';
}

export default class Form extends React.Component {
  state = {
    name: '',
    customer: '',
  };

  render() {
    return (
      <View>
        <TextInput
          style={formstyle}
          value={this.state.name}
          placeholder="Name of Project..."
          onChangeText={(text) => {
            this.setState({ name: text });
            projectName = text;
          }}
        />
        <Button
        title={'submit'}
        onPress={() => {
          if(projectName.length == 0)
          {
            alert('Project must have a name')
          }
          else {
            submitForm()
            this.setState(
              {
                name: '',
                customer: ''
              }
            )
          }
        }}
        />
      </View>
    );
  }
}
const formstyle = {
  padding: '5px',
  textAlign: 'center',
  align: 'center',
  margin: 15,
  borderColor: 'black',
  borderWidth: 1,
};
