import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: 'slide1',
    title: 'Welcome to Our App',
    text: 'Discover amazing features to help you grow.',
    image: require('../../assets/images/onboarding/slide1.png'),
  },
  {
    key: 'slide2',
    title: 'Track Your Progress',
    text: 'Stay updated with your tasks and goals.',
    image: require('../../assets/images/onboarding/slide2.png'),
  },

];

export default function OnboardingScreen({ navigation }) {
  const handleDone = async () => {
    await AsyncStorage.setItem('hasOnboarded', 'true');
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image}/>
       <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
    </View>
    </View>
  );

  return <AppIntroSlider data={slides} renderItem={renderItem} onDone={handleDone} showSkipButton />;
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    position:'relative',
  },
  image: {
    width: 360,
    height:812,
    borderRadius:20,
    position:'absolute'
  },
  buttomfield:{
    width:414,
    height:318,
    backgroundColor:"#fff",
    top:621,
    left:-20,

  },

   overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  title: {
    width:319,
    height:108,
    top:29,
 
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
});
