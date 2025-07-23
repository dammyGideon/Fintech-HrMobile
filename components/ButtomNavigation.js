// components/BottomNavigationBar.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';

const tabs = [
  { label: 'Home', icon: 'home', route: 'Dashboard' },
  { label: 'Finance', icon: 'money', route: 'Finance' },
  { label: 'Leave', icon: 'calendar-check-o', route: 'Leave' },
  { label: 'Me', icon: 'user', route: 'Profile' },
];

const BottomNavigationBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = route.name === tab.route;
        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.route)}
          >
            <FontAwesome
              name={tab.icon}
              size={24}
              color={isActive ? '#082F7C' : '#888'}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 10,
  },
  tab: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeLabel: {
    color: '#082F7C',
    fontWeight: '600',
  },
});

export default BottomNavigationBar;
