import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import io, { Socket } from 'socket.io-client'; // Ensure proper import
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App'; // Adjust the path as needed
import { useUserRole } from './UserRoleContext'; // Import the useUserRole hook

type AdminLoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AdminLoginScreen'
>;

type Props = {
  navigation: AdminLoginScreenNavigationProp;
};

const AdminLoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const { setUserRole } = useUserRole();

  // WebSocket state
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      // Connect to WebSocket server after login
      const newSocket = io('http://10.0.2.2:3000/admin', { transports: ['websocket'] });
      setSocket(newSocket);

      // Listen for notifications from the server
      newSocket.on('admin_response', (data) => {
        console.log('Received notification:', data);
        Alert.alert('Notification', data.message || 'No message received'); // Handle empty messages
      });

      return () => {
        newSocket.disconnect(); // Cleanup on unmount or logout
      };
    }
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setIsLoggedIn(true);
        setUserRole('admin');
        navigation.navigate('DirectoryScreen'); // Navigate to directory screen after login
      } else {
        setError('Incorrect username or password');
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Error logging in');
    }
  };

  const handlePushNotification = () => {
    if (!notificationMessage.trim()) {
      Alert.alert('Push Notification', 'Notification message cannot be empty');
      return;
    }

    // Emit notification message to WebSocket server
    if (socket) {
      socket.emit('admin_action', { message: notificationMessage });
      setNotificationMessage(''); // Clear the input field after sending
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://10.0.2.2:3000/admin-logout', { method: 'POST' });
      setIsLoggedIn(false);
      setUserRole('guest');
      navigation.navigate('AdminLoginScreen');
      if (socket) {
        socket.disconnect(); // Disconnect from WebSocket on logout
      }
    } catch (error) {
      console.error('Logout error', error);
      Alert.alert('Logout Error', 'Error logging out');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <>
          <Text style={styles.title}>Admin Login</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <Button title="Login" onPress={handleLogin} />
        </>
      ) : (
        <>
          <Text style={styles.welcomeText}>Hello, Admin!</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter notification message"
            value={notificationMessage}
            onChangeText={setNotificationMessage}
          />
          <Button title="Push Notification" onPress={handlePushNotification} />
          <View style={styles.buttonSpacing} />
          <Button title="Logout" onPress={handleLogout} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  welcomeText: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  errorText: { color: 'red', textAlign: 'center' },
  buttonSpacing: { marginVertical: 10 }, // Adds vertical space between buttons
});

export default AdminLoginScreen;