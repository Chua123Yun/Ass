import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { Icon } from 'react-native-elements';
import { stores } from './CommonData';


interface EventCardProps {
 images: ImageSourcePropType[];
  date: string;
  location: string;
  title: string;
  description: string;
}

const EventCard: React.FC<EventCardProps> = ({ images, date, location, title,description }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };
  const toggleDescription = () => {
    setShowDescription(!showDescription);
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
        <Text style={styles.titleText}>{title}</Text>
        <TouchableOpacity onPress={toggleDescription}>
          <Text style={styles.detailsText}>{showDescription ? '- DESCRIPTION' : '+ DESCRIPTION'}</Text>
        </TouchableOpacity>
        {showDescription && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};


const EventDetails: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>EVENTS</Text>
      </View>
      <EventCard
        images={[
          require('./EventPromoImages/mk1.jpg'),
          require('./EventPromoImages/mk2.jpg'),
          require('./EventPromoImages/mk3.jpg'),
          require('./EventPromoImages/mk4.jpg'),
        ]}
        date="04 SEPT 2024 - 17 SEPT 2024"
        location="Ground Floor Centre Court (SushiKing)"
        title="Moonlit Stroll"
        description="Experience the Magic of the Mid-Autumn Festival at 1 Utama! ✨🐇
Join us for a mesmerizing 𝑴𝒐𝒐𝒏𝒍𝒊𝒕 𝑺𝒕𝒓𝒐𝒍𝒍 from 4-17 September, where the glow of the moon guides you through a celestial market filled with almost 30 of your favorite brands. 
✨ Immerse yourself in the beauty of the festival, indulge in the finest mooncakes and delightful F&B treats, and capture stunning photos under the radiant lanterns and lights. 📸🌕
 Exclusive Offer: Spend a minimum of RM380 (or RM500 for non-ONECARD members) at participating brands at GF Centre Court and receive a complimentary Porcelain Teaware Set—perfect for sipping tea under the stars. 🌌🍵
Let the moonlight and playful rabbit lead you to an evening of wonder and enchantment. Come celebrate with us and make this Mid-Autumn Festival unforgettable! 🌠🍂
𝑊ℎ𝑖𝑙𝑒 𝑠𝑡𝑜𝑐𝑘𝑠 𝑙𝑎𝑠𝑡, 𝑜𝑛𝑒 𝑟𝑒𝑑𝑒𝑚𝑝𝑡𝑖𝑜𝑛 𝑝𝑒𝑟 𝑐𝑢𝑠𝑡𝑜𝑚𝑒𝑟. 
(𝑀𝑎𝑥 2 𝑟𝑒𝑐𝑒𝑖𝑝𝑡𝑠 𝑜𝑛 𝑡ℎ𝑒 𝑠𝑎𝑚𝑒 𝑑𝑎𝑦)"
      />
      <EventCard
        images={[
          require('./EventPromoImages/spend.jpg'),

        ]}
        date="01 SEPT 2024 - 30 NOV 2024"
        location="Food & Beverage Categor Shop"
        title="Spend & Reward "
        description='Shop mall-wide with the Spend & Reward campaign, and redeem RM30 shopping vouchers to spend at the participating tenant for Food and Beverage. What are you waiting for? Start your retail adventure today! '
      />
      <EventCard
        images={[
          require('./EventPromoImages/p1.jpg'),
          require('./EventPromoImages/firdaus.png'),


        ]}
        date="23 AUG 2024 - 23 SEPT 2024"
        location="Popular (L150)"
        title=" MEMBER EXCLUSIVE WITH 菲道尔 "
        description='[𝟐𝟎%* 𝐒𝐭𝐨𝐫𝐞𝐰𝐢𝐝𝐞 𝐃𝐢𝐬𝐜𝐨𝐮𝐧𝐭 𝐆𝐢𝐟𝐭 𝐂𝐞𝐫𝐭 𝐟𝐨𝐫 𝐏𝐎𝐏𝐔𝐋𝐀𝐑 𝐂𝐚𝐫𝐝 𝐌𝐞𝐦𝐛𝐞𝐫!]
Members, treat yourself with exclusive 20%* Storewide Discount Gift Certificate in the latest POPClub’s magazine . Grab your physical Gift Certificate or just present the e-Gift Certificate 𝐨𝐧 𝐨𝐮𝐫 𝐦𝐨𝐛𝐢𝐥𝐞 𝐚𝐩𝐩 today and plan your shopping trip at any POPULAR/HARRIS bookstore near you! Promotion till 22 Sept! 
Also, stay updated with our cover story featuring the talented singer 菲道尔- Firdhaus. '
      />
      <EventCard
        images={[
          require('./EventPromoImages/upcomingevent.jpg'),

        ]}
        date=""
        location=""
        title="  "
        description=''
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
});

export default EventDetails;
