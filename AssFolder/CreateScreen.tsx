import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import io from 'socket.io-client';

const CreateScreen = ({ navigation }: any) => {
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('DIY');
  const [floor, setFloor] = useState('Ground');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  
  // Initialize socket connection
  const socket = io('http://10.0.2.2:3000');

  useEffect(() => {
    return () => {
      socket.disconnect(); // Cleanup socket on unmount
    };
  }, []);

  const validateInputs = () => {
    if (!storeName || !phone || !description) {
      Alert.alert('Validation Error', 'Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const createStore = async () => {
    if (!validateInputs()) return;

    const storeData = {
      category,
      floor,
      phone,
      description,
      mapLocation: 'MapComponent', // Placeholder for map location
      id: storeName.replace(/\s+/g, '_'),
      storeName,
    };

    setLoading(true);

    try {
      const response = await fetch('http://10.0.2.2:3000/create-store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ storeName, storeData }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', result.message);

        if (socket) {
          socket.emit('store_created', storeData);
        }
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'An error occurred');
      }
    } catch (err) {
      Alert.alert('Error', `Failed to create store: ${err.message}`);
    } finally {
      setLoading(false);
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
        style={styles.picker}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="DIY" value="DIY" />
        <Picker.Item label="Beauty" value="Beauty" />
        <Picker.Item label="Food" value="Food" />
        <Picker.Item label="Food Court" value="Food Court" />
        <Picker.Item label="Entertainment" value="Entertainment" />
        <Picker.Item label="Health and Wellness" value="Health and Wellness" />
        <Picker.Item label="Lifestyle and Home Living" value="Lifestyle and Home Living" />
        <Picker.Item label="Convenience and Services" value="Convenience and Services" />
        <Picker.Item label="Snacks and Dessert" value="Snacks and Dessert" />
        <Picker.Item label="Sports and Shoes" value="Sports and Shoes" />
      </Picker>

      <Text style={styles.label}>Floor:</Text>
      <Picker
        selectedValue={floor}
        style={styles.picker}
        onValueChange={(itemValue) => setFloor(itemValue)}
      >
        <Picker.Item label="Ground" value="Ground" />
        <Picker.Item label="First" value="First" />
        <Picker.Item label="Second" value="Second" />
        {/* Add more floor options if necessary */}
      </Picker>

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
      />

      <Button title={loading ? 'Creating...' : 'Create Store'} onPress={createStore} disabled={loading} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 16 },
  picker: { height: 50, width: '100%', marginBottom: 16 },
  textArea: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 16 },
});

export default CreateScreen;
