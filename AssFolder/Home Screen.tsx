import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import EventDetails from './EventDetails';
import PromotionDetails from "./PromotionDetails";

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Shopping Mall Guide</Text>
        <Image style={styles.image} source={require('./Images/img1.png')} />
        <View style={styles.rowContainer}>
          <View >
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('EventDetails')}>
            <Image style={styles.buttonImage} source={require('./EventPromoImages/upcomingevent.jpg')} />
            <Text style={styles.buttonText}>EventDetails</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('PromotionDetails')}>
            <Image style={styles.buttonImage} source={require('./EventPromoImages/promotion.png')} />
            <Text style={styles.buttonText}>Promotions</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyrightContainer}>
        <Text style={styles.copyright}>Copyright © 2024 Shopping Mall Guide Sdn Bhd</Text>
        <Text style={styles.copyright}>All rights reserved. This guide and all content herein are the property of City Center Mall and may not be reproduced, distributed, or transmitted in any form without prior written permission.</Text>
        </View>
      </View>
    </SafeAreaView>
  )
};

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="PromotionDetails" component={PromotionDetails}/>
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  container: { flex: 1 ,backgroundColor:'#e3e3e3'},
  innerContainer: { flex: 1 },
  header: { textAlign: 'center', fontSize: 24, backgroundColor: '#c85757', padding: 16,fontWeight:'bold',color:'#473636' },
  image: { height:250, width: 373,margin:10},
  rowContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '80%' },
  buttonContainer: { alignItems: 'center', marginHorizontal: 8,borderWidth:2,borderColor:'black',borderRadius:4 },
  buttonImage: { width: 176, height: 150, marginBottom:2 },
  buttonText: { fontSize: 16,marginBottom:5,fontWeight:'bold' },
  copyrightContainer:{paddingTop:18},
  copyright: { fontSize: 14, textAlign: 'center', alignItems: 'center', backgroundColor: '#e3e3e3',  }
});
