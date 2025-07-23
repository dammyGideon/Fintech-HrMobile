// hooks/usePushNotifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect } from 'react';

export const usePushNotifications = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        console.log('Expo Push Token:', token);

        // TODO: Send token to your backend here
        fetch('https://localhost:8080/send-test', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token,
            title: 'Welcome!',
            body: 'Push notification setup complete 🎉',
          }),
        });
      }
    });

    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Tapped:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
};

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}
