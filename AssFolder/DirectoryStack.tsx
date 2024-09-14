import React, { useRef, useState } from "react";
import {View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  LayoutChangeEvent,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { stores, Store } from "./CommonData"; // Update with your actual path
import { useNavigation } from '@react-navigation/native';
import { useUserRole } from './UserRoleContext';
import { FloatingAction } from 'react-native-floating-action';
import CreateScreen from './CreateScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './App'; 

const { height } = Dimensions.get('window');
type DirectoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'DirectoryScreen'>;
const actionsForAdmin = [
  {
    text: 'Add',
    icon: require('../icons/add_icon.png'), // Make sure to provide the correct path to the icon
    name: 'add',
    position: 1,
  },
];

const DirectoryScreen = () => {
  const [activeTab, setActiveTab] = useState("Bakery"); // Track the active tab
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({}); // Store positions of sections
  const navigation = useNavigation<DirectoryScreenNavigationProp>(); // Use typed navigation
  const { userRole } = useUserRole();

  const handleScrollTo = (section: string) => {
    setActiveTab(section); // Set active tab when a button is pressed
    if (sectionPositions.current[section]) {
      scrollViewRef.current?.scrollTo({ y: sectionPositions.current[section], animated: true });
    }
  };

  const storeSectionPosition = (section: string, event: LayoutChangeEvent) => {
    const { y } = event.nativeEvent.layout;
    sectionPositions.current[section] = y; // Store the section's Y position
  };

  const handlePress = (storeName: string) => {
    navigation.navigate(storeName); // Navigate to the specific store screen
  };
  const handleActionPress = (name: string) => {
    console.log('Action pressed:', name); // Debugging line
    if (name === 'add') {
      console.log('Navigating to CreateScreen'); // Debugging line
      navigation.navigate( 'CreateScreen');

    }
  };

  const Actions = [...(userRole === 'admin' ? actionsForAdmin : [])];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Directory</Text>
      </View>
      <View style={{ flex: 2 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
          style={styles.tabContainer}>

          <TouchableOpacity
            style={[styles.button, activeTab === "Bakery" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Bakery")}>
            <MaterialCommunityIcons name="food-croissant" size={24} color={activeTab === "Bakery" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Bakery" && styles.activeButtonText]}>Bakery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Beauty" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Beauty")}>
            <MaterialCommunityIcons name="face-woman-shimmer-outline" size={24} color={activeTab === "Beauty" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Beauty" && styles.activeButtonText]}>Beauty and Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Books" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Books")}>
            <MaterialCommunityIcons name="shopping" size={24} color={activeTab === "Books" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Books" && styles.activeButtonText]}>Books gifts and Toys</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Department" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Department")}>
            <MaterialCommunityIcons name="garage" size={24} color={activeTab === "Department" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Department" && styles.activeButtonText]}>Department Stores</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Digital" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Digital")}>
            <MaterialCommunityIcons name="tablet-android" size={24} color={activeTab === "Digital" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Digital" && styles.activeButtonText]}>Digital and Home Appliances</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Fashion" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Fashion")}>
            <MaterialCommunityIcons name="shopping" size={24} color={activeTab === "Fashion" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Fashion" && styles.activeButtonText]}>Fashion</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Enrichments" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Enrichments")}>
            <MaterialCommunityIcons name="mother-heart" size={24} color={activeTab === "Enrichments" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Enrichments" && styles.activeButtonText]}>Enrichments and Hobbies</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Food" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Food")}>
            <MaterialCommunityIcons name="food" size={24} color={activeTab === "Food" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Food" && styles.activeButtonText]}>Food and Beverages</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Foodcourt" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Foodcourt")}>
            <MaterialCommunityIcons name="food-outline" size={24} color={activeTab === "Foodcourt" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Foodcourt" && styles.activeButtonText]}>Foodcourt</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Entertainment" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Entertainment")}>
            <MaterialCommunityIcons name="movie-outline" size={24} color={activeTab === "Entertainment" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Entertainment" && styles.activeButtonText]}>Entertainment</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Health" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Health")}>
            <MaterialCommunityIcons name="heart-pulse" size={24} color={activeTab === "Health" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Health" && styles.activeButtonText]}>Health and Wellness</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Lifestyle" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Lifestyle")}>
            <MaterialCommunityIcons name="sofa-outline" size={24} color={activeTab === "Lifestyle" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Lifestyle" && styles.activeButtonText]}>Lifestyle and Home Living</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Convienience" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Convienience")}>
            <MaterialCommunityIcons name="store" size={24} color={activeTab === "Convienience" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Convienience" && styles.activeButtonText]}>Convienience and Services</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={[styles.button, activeTab === "Snacks" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Snacks")}>
            <MaterialCommunityIcons name="cupcake" size={24} color={activeTab === "Snacks" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Snacks" && styles.activeButtonText]}>Snacks and Desserts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, activeTab === "Sports" && styles.activeButton]}
            activeOpacity={0.7}
            onPress={() => handleScrollTo("Sports")}>
            <MaterialCommunityIcons name="shoe-cleat" size={24} color={activeTab === "Sports" ? "#fff" : "#000"} style={styles.icon} />
            <Text style={[styles.buttonText, activeTab === "Sports" && styles.activeButtonText]}>Sports and Shoes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={{ flex: 14, paddingBottom: 100 }}>
        <ScrollView ref={scrollViewRef} style={styles.content}>
          <View onLayout={(event) => storeSectionPosition("Bakery", event)}>
            <StoreSection title="Bakery Section" storeData={stores.bakery} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Beauty", event)}>
            <StoreSection title="Beauty and Service Section" storeData={stores.beauty} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Books", event)}>
            <StoreSection title="Books gifts and Toys Section" storeData={stores.books} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Department", event)}>
            <StoreSection title="Department Stores Section" storeData={stores.department} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Digital", event)}>
            <StoreSection title="Digital and Home Appliances Section" storeData={stores.digital} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Fashion", event)}>
            <StoreSection title="Fashion Section" storeData={stores.fashion} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Enrichments", event)}>
            <StoreSection title="Enrichments and Hobbies Section" storeData={stores.enrichment} onPress={handlePress} />
          </View>

          
          <View onLayout={(event) => storeSectionPosition("Food", event)}>
            <StoreSection title="Food and Beverages Section" storeData={stores.food} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Foodcourt", event)}>
            <StoreSection title="Foodcourt Section" storeData={stores.foodcourt} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Entertainment", event)}>
            <StoreSection title="Entertainment Section" storeData={stores.entertainment} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Health", event)}>
            <StoreSection title="Health and Wellness Section" storeData={stores.health} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Lifestyle", event)}>
            <StoreSection title="Lifestyle and Home Living Section" storeData={stores.lifestyle} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Convienience", event)}>
            <StoreSection title="Convienience adn Services Section" storeData={stores.convienience} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Snacks", event)}>
            <StoreSection title="Snacks and Dessert Section" storeData={stores.snacks} onPress={handlePress} />
          </View>
          <View onLayout={(event) => storeSectionPosition("Sports", event)}>
            <StoreSection title="Sports and Shoes Section" storeData={stores.sports} onPress={handlePress} />
          </View>
        </ScrollView>
        <View style={styles.floatingActionContainer}>
      {userRole === 'admin' && (
        <FloatingAction
          actions={Actions}
          onPressItem={(name) => handleActionPress(name)}
          color="blue"
         
        />
      )}
      </View>
      </View>
    </View>
  );
};

// Reusable component for rendering each store section
const StoreSection = ({ title, storeData, onPress }: { title: string; storeData: Store[]; onPress: (storeName: string) => void }) => (
  <View style={styles.section}>
    <Text style={styles.contentText}>{title}</Text>
    {storeData.map((store) => (
      <TouchableOpacity key={store.id} style={styles.storeBox} onPress={() => onPress(store.name)}>
       <Image source={store.localImage} style={styles.storeImage} />
        <View style={styles.storeDetails}>
          <Text style={styles.storeName}>{store.name}</Text>
          <Text style={styles.storeFloor}>{store.floor}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1,justifyContent: "flex-start",},
  tabContainer: {flex: 2,},
  scrollViewContainer: {alignItems: "center",paddingHorizontal: 5,backgroundColor: "#eee",},
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 6,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeButton: {backgroundColor: "#c85757",},
  icon: { marginRight: 5,},
  buttonText: {fontSize: 14,color: "#000",},
  activeButtonText: {color: "#fff",},
  content: {flex: 8,paddingTop:2,},
  section: {marginBottom: 10,},
  contentText: {fontSize: 20,marginBottom: 8,marginLeft:6},
  storeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'black'
  },
  storeFloor: {
    fontSize: 16,
    color: '#494949',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    backgroundColor:'#c85757',
    color:'#473636'

  },
  headerContainer: { // Added a new style for the header container
    height: 64, // Adjust the height as per your requirement
    justifyContent: 'center', // Center the text vertically
    backgroundColor: '#c85757', // Keep the background color
    paddingHorizontal: 20, // Add some padding for a better look
  },
  floatingActionContainer: {
    bottom: 30,
  },
});

export default DirectoryScreen;