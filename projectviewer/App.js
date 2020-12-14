import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProjectScreen from './components/ProjectScreen.js';
import CustomerList from './components/CustomerList.js';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if(route.name == 'Projects') {
                  iconName = focused
                  ? 'ios-filing'
                  : 'ios-filing';
                }
                else if (route.name == 'Customers') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                }

                return <Ionicons name={iconName} size={size} color={color} />
              }
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
            }}
        >
          <Tab.Screen name="Projects" component={ProjectScreen} />
          <Tab.Screen name="Customers" component={CustomerList} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

