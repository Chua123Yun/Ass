import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '../CommonData'; // Import the stores object
import { useUserRole } from '../UserRoleContext'; // Context to get the user role
import { FloatingAction } from 'react-native-floating-action';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ADIDAS = () => {
  const navigation = useNavigation();
  const { userRole } = useUserRole();
  const storeData = stores.sports.find(store => store.id === 1);
  const handleEdit = () => {
    navigation.navigate('EditScreen', { storeData });
  };

  const handleDelete = async () => {
    try {
      console.log('Sending delete request...');
      const response = await fetch(`http://<Your-IP-Address>:3000/delete-store/${storeData.id}`, {
        method: 'DELETE',
      });
      console.log('Response status:', response.status);
      if (response.ok) {
        Alert.alert('Success', 'Store deleted successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to delete store.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const actionsForAdmin = [
    {
      text: 'Edit',
      icon: require('../../icons/edit_icon.png'),
      name: 'edit',
      position: 1,
    },
    {
      text: 'Delete',
      icon: require('../../icons/delete_icon.jpg'),
      name: 'delete',
      position: 2,
    },
  ];

  const handleActionPress = (name) => {
    if (name === 'edit') handleEdit();
    else if (name === 'delete') handleDelete();
  };

  const Actions = [...(userRole === 'admin' ? actionsForAdmin : [])];

  return (
    <View style={styles.container}>
      <Image source={require('../DetailsPages/PagesImg/ADIDAS.png')} style={styles.storeImage} />
      <View style={styles.storeInfo}>
        <View style={styles.storeDetails}>
          <Text style={styles.category}>{storeData.category}</Text>
          <Text style={styles.storeName}>{storeData?.name}</Text>
          <Text style={styles.floor}>{storeData?.floor}</Text>
          <Text style={styles.phoneNumber}>{storeData?.phone}</Text>
        </View>
        <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate(storeData.mapLocation)}>
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{storeData?.description}</Text>
      {userRole === 'admin' && (
        <FloatingAction
          actions={Actions}
          onPressItem={handleActionPress}
          floatingIcon={<MaterialCommunityIcons name="plus" size={24} color="#fff" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, bottom: 50 },
  storeImage: { width: '100%', height: 200, borderRadius: 10, marginBottom: 16 },
  storeInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  storeDetails: { flex: 1 },
  category: { fontSize: 16, fontWeight: '600', color: '#555' },
  storeName: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
  floor: { fontSize: 16, marginTop: 4, color: '#777' },
  phoneNumber: { fontSize: 16, color: '#777', marginTop: 4 },
  description: { fontSize: 16, marginTop: 16, lineHeight: 24, color: '#333' },
  mapButton: { backgroundColor: '#4CAF50', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  mapButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default ADIDAS;
