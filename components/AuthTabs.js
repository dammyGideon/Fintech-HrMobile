// components/AuthTabs.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function AuthTabs({ activeTab, onLoginPress, onSignupPress }) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity onPress={onLoginPress} style={styles.tabWrapper}>
        <Text style={[styles.tab, activeTab === 'login' && styles.activeTab]}>Login</Text>
        {activeTab === 'login' && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignupPress} style={styles.tabWrapper}>
        <Text style={[styles.tab, activeTab === 'signup' && styles.activeTab]}>Sign-up</Text>
        {activeTab === 'signup' && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabWrapper: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  activeTab: {
    color: '#082F7C', // your blue
  },
  underline: {
    height: 3,
    width: '100%',
    backgroundColor: '#E19F21', // your orange
    marginTop: 5,
    borderRadius: 2,
  },
});
