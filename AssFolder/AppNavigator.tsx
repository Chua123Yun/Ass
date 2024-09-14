// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home Screen';
import AdminLoginScreen from './AdminLoginScreen';
import CreateScreen from './CreateScreen';
import EditScreen from './EditScreen';
import DirectoryScreen from './DirectoryScreen';
import { RootStackParamList } from "./App"; // Import types

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DirectoryScreen">
      
      <Stack.Screen name="DirectoryScreen" component={DirectoryScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AdminLoginScreen" component={AdminLoginScreen} />
      {/* Other screens can be added here */}
    </Stack.Navigator>
  );
};

export default AppNavigator;