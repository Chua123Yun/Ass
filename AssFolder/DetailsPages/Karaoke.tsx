import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { stores } from '../CommonData'; // Import the stores object
import L282 from '../MapPages/L282';
const Karaoke = () => {
  const navigation = useNavigation();
  const storeData = stores.entertainment.find(store => store.id === 2);

  return (
    <View style={styles.container}>
      <Image source={storeData?.localImage ? storeData.localImage : undefined}
  style={styles.storeImage}
/>
      <View style={styles.storeInfo}>
        <View style={styles.storeDetails}>
          <Text style={styles.category}>Entertainment</Text>
          <Text style={styles.storeName}>{storeData?.name}</Text>
          <Text style={styles.floor}>{storeData?.floor}</Text>
          <Text style={styles.phoneNumber}>{storeData?.phone}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => navigation.navigate(L282)} // Update with correct route name
        >
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{storeData?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1,padding: 16,},
  storeImage: {width: '100%',height: 200,borderRadius: 10,marginBottom: 16,},
  storeInfo: {flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',marginBottom: 16,},
  storeDetails: {flex: 1,},
  category: {fontSize: 16,fontWeight: '600',color: '#555',},
  storeName: {fontSize: 20,fontWeight: 'bold',marginTop: 4,},
  floor: {fontSize: 16,marginTop: 4,color: '#777',},
  phoneNumber: {fontSize: 16,color: '#777',marginTop: 4,},
  description: {fontSize: 16,marginTop: 16,lineHeight: 24,color: '#333',},
  mapButton: {backgroundColor: '#4CAF50',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 10,alignItems: 'center',},
  mapButtonText: {color: '#fff',fontSize: 16,fontWeight: 'bold',},
});

export default Karaoke;
