import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import io from 'socket.io-client';

const CreateScreen = ({ navigation }: { navigation: any }) => {
  const [storeName, setStoreName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [floor, setFloor] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [socket, setSocket] = useState<any>(null);

  // List of categories
  const categories = [
    'Bakery',
    'Beauty and Service',
    'Books, Gifts, and Toys',
    'Department Store',
    'Digital and Home Appliances',
    'Enrichments and Hobbies',
    'Fashion',
    'Food and Beverages',
    'Food Court',
    'Entertainment',
    'Health and Wellness',
    'Lifestyle and Home Living',
    'Convenience and Services',
    'Snacks and Dessert',
    'Sports and Shoes',
  ];

  useEffect(() => {
    const newSocket = io('http://10.0.2.2:3000', { transports: ['websocket'] });
    setSocket(newSocket);

    newSocket.on('connect_error', (error) => {
      Alert.alert('WebSocket Error', `Connection failed: ${error.message}`);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  // Function to create store dynamically
  const createStore = async (): Promise<void> => {
    if (!storeName || !category || !floor || !phone || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const storeData = {
      category,
      floor,
      phone,
      description,
      mapLocation: 'MapComponent',
      id: storeName.replace(/\s+/g, '_'),
      storeName
    };

    try {
      console.log('Sending request to server with body:', storeData);

      const response = await fetch('http://10.0.2.2:3000/create-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storeData),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message);

        if (socket) {
          socket.emit('store-created', storeData); // Emit event
        }

        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'An error occurred');
      }
    } catch (err) {
      console.error('Failed to create store:', err);
      Alert.alert('Error', `Failed to create store: ${err.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Store Name:</Text>
      <TextInput
        style={styles.input}
        value={storeName}
        onChangeText={setStoreName}
        placeholder="Enter store name"
      />

      <Text style={styles.label}>Category:</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Select a category" value="" />
        {categories.map((cat) => (
          <Picker.Item key={cat} label={cat} value={cat} />
        ))}
      </Picker>

      <Text style={styles.label}>Floor:</Text>
      <TextInput
        style={styles.input}
        value={floor}
        onChangeText={setFloor}
        placeholder="Enter floor"
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
      />

      <Button title="Create Store" onPress={createStore} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 18, marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 16 },
});

export default CreateScreen;
