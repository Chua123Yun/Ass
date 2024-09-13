import React from 'react';
import { Dimensions, View, TouchableNativeFeedback } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './AssFolder/HomeStack'; // Adjust the path as needed
import AdminLoginScreen from './AssFolder/AdminLoginScreen';
import DirectoryStack from './AssFolder/DirectoryStack'; // Import the DirectoryStack
import { UserRoleProvider } from './AssFolder/UserRoleContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StoreProvider } from './AssFolder/StoreContext';
const Tab = createBottomTabNavigator();

const CustomBottom = ({ children, onPress }: any) => {
  return (
    <TouchableNativeFeedback
      style={{ justifyContent: 'center', alignItems: 'center' }}
      onPress={onPress}
    >
      <View
        style={{
          width: 130,
          backgroundColor: '#609146',
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        {children}
      </View>
    </TouchableNativeFeedback>
  );
};

const App = () => {
  const winHeight = Dimensions.get('window').height;

  return (
    <StoreProvider>
    <UserRoleProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              height: winHeight * 0.1,
              position: 'absolute',
              backgroundColor: '#b3bab5',
              borderTopWidth: 2,
              borderTopColor: 'black',
            },
          }}
        >
          <Tab.Screen
            name="home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="home"
                  size={50}
                  color={focused ? 'red' : 'white'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="directory"
            component={DirectoryStack}
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="book"
                  size={50}
                  color={focused ? '#364d2a' : 'white'}
                />
              ),
              tabBarButton: (props: any) => <CustomBottom {...props} />,
            }}
          />
          <Tab.Screen
            name="admin"
            component={AdminLoginScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialCommunityIcons
                  name="lock"
                  size={50}
                  color={focused ? 'red' : 'white'}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserRoleProvider>
    </StoreProvider>
  );
};

export default App;
