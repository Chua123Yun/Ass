// screens/EditScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { stores } from './CommonData'; // Import the stores object

type EditScreenRouteProp = RouteProp<RootStackParamList, 'EditScreen'>;

const EditScreen: React.FC<{ route: EditScreenRouteProp }> = ({ route }) => {
  const { storeData } = route.params;
  const [name, setName] = useState(storeData.name);
  const [phone, setPhone] = useState(storeData.phone);
  const [floor, setFloor] = useState(storeData.floor);
  const [description, setDescription] = useState(storeData.description);
  const navigation = useNavigation();

  useEffect(() => {
    // Initialize state with storeData
    setName(storeData.name);
    setPhone(storeData.phone);
    setFloor(storeData.floor);
    setDescription(storeData.description);
  }, [storeData]);

  const handleSave = () => {
    // Update store data
    const updatedStore = { ...storeData, name, phone, floor, description };

    // Find and update the store in the data
    const storeIndex = stores.sports.findIndex(store => store.id === storeData.id);
    if (storeIndex !== -1) {
      stores.sports[storeIndex] = updatedStore;
      Alert.alert('Success', 'Store details updated');
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Store not found');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Store</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Store Name"
      />
      <TextInput
      
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={floor}
        onChangeText={setFloor}
        placeholder="Floor"
      />
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default EditScreen;