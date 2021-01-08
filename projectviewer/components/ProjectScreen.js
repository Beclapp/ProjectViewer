import React, { useState } from 'react';
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'

import Project from './Project.js'
import Form, { projectName } from './NewProjectForm'
import ProjectList from './ProjectList'

const Root = createStackNavigator()
let staticCount = 0;

const DefaultScreen = ({ navigation }) => {
  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        style={styles.button}
        title={'+'}
        onPress={() => {
          items.push({project: staticCount, text: projectName})
        navigation.push('Add Project')
            }
          }
       />
      <Text>Home!</Text>
      <ProjectList />
    </View>
  )
}

const FormScreen = ({ route }) => {
  return <Form />
}

let items = []
export default class ProjectScreen extends React.Component {
   constructor() {
    super();
    this.state = {
      count: 0,
      form: false,
    };
  }
  newProject = () => {
    this.setState({value: 'Project' + staticCount})
    staticCount++;
  };

  render () {
    return (
        <Root.Navigator>
          <Root.Screen name="Projects" component={DefaultScreen} />
          <Root.Screen name="Add Project" component={FormScreen} />
        </Root.Navigator>
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
    flex: 1
  },
})
