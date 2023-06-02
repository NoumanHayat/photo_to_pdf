/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {DataProvider} from './code/hooks';
import Container from './components/Container';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './code/screen/home';
import Confirm from './code/screen/confirm';
function AppStarting() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <StatusBar barStyle="dark-content" backgroundColor={'black'} /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Confirm'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Confirm" component={Confirm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppStarting />
    </DataProvider>
  );
}
