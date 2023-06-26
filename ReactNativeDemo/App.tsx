/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import ListScreen from './app/ListScreen';
import { NavigationContainer } from '@react-navigation/native';
import DetailsScreen from './app/DetailsScreen';

function App(): JSX.Element {
  
  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
