import React from 'react';
import { AuthProvider } from './context/AuthContext'; 
import AppNavigator from './navigations/AppNavigator';
import { usePushNotifications } from './hooks/usePushNotifications';

export default function App() {
  usePushNotifications();
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
