import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageSourcePropType,Button } from 'react-native';
import { Icon } from 'react-native-elements';
import type { StackScreenProps } from '@react-navigation/stack';



interface EventCardProps {
 images: ImageSourcePropType[];
  date: string;
  location: string;
  
}

const EventCard: React.FC<EventCardProps> = ({ images, date, location}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };



  

  return (
    
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={images[currentImageIndex]} style={styles.image} />
        <TouchableOpacity style={styles.leftArrow} onPress={handlePreviousImage}>
          <Icon name="chevron-left" type="font-awesome" color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightArrow} onPress={handleNextImage}>
          <Icon name="chevron-right" type="font-awesome" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.dateText}>
          <Icon name="calendar" type="font-awesome" color="#6b7280" size={14} /> {date}

        </Text>
        <Text style={styles.locationText}>
          <Icon name="map-marker" type="font-awesome" color="#6b7280" size={14} /> {location}
        </Text>
      </View>
    </View>
   
  );
};


const PromotionDetails: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROMOTIONS</Text>
      </View>
      <EventCard
        images={[
          require('./EventPromoImages/diy4.png'),
          require('./EventPromoImages/diy1.jpg'),
          require('./EventPromoImages/diy2.jpg'),
          require('./EventPromoImages/diy3.jpg'),
        ]}
        date="4 SEPT 2024 - 30 SEPT 2024"
        location="MR DIY (L165)"
        
      />
      <EventCard
        images={[
            require('./EventPromoImages/SKLogo.png'),
          require('./EventPromoImages/sk.jpg'),
          

        ]}
        date="2 SEPT 2024 - 27 OCT 2024"
        location="SUSHI KING (G28)"
        
      />
      <EventCard
        images={[
          require('./EventPromoImages/my2.png'),
          require('./EventPromoImages/my1.jpg'),


        ]}
        date="1 SEPT 2024 - 31 OCT 2024"
        location=" (G21)"
      />
      <EventCard
        images={[
          require('./EventPromoImages/promotion.png'),

        ]}
        date=""
        location=""
      />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#f97316',
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  leftArrow: {
    position: 'absolute',
    top: '50%',
    left: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
  },
  rightArrow: {
    position: 'absolute',
    top: '50%',
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
  },
  cardContent: {
    padding: 16,
  },
  dateText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  locationText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailsText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  description:{
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 4,
  },
  mapButton: {backgroundColor: '#4CAF50',paddingVertical: 10,paddingHorizontal: 20,borderRadius: 10,alignItems: 'center',},
  mapButtonText: {color: '#fff',fontSize: 16,fontWeight: 'bold',},
});

export default PromotionDetails;
