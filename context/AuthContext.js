// import React, { createContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { jwtDecode } from 'jwt-decode';
// import { LoginUser, fetchCustomerById, getWalletByUserId } from '../services/authService';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [customer, setCustomer] = useState(null);
//   const [wallet, setWallet]= useState(null);

//   const [loading, setLoading] = useState(true); // For loading state on startup

//   // ✅ Load token and user on app start
//   useEffect(() => {
//     const loadStoredToken = async () => {
//       try {
//         const storedToken = await AsyncStorage.getItem('token');
//         if (storedToken) {
//           const decoded = jwtDecode(storedToken);
//           const customerId =
//             decoded.customerId || decoded.customerID || decoded.customeId;

//           const customerData = await fetchCustomerById(customerId, storedToken);
//           const walletData = await getWalletByUserId(decoded.UserId,token)
//           setToken(storedToken);
//           setUser({ ...decoded });
//           setCustomer(customerData.data);
//           setWallet(walletData.data);
//         }
//       } catch (error) {
//         console.log('Error loading stored token:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStoredToken();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const data = await LoginUser(credentials);
//       const token = data.data.token;
//       setToken(token);
//       await AsyncStorage.setItem('token', token); // ✅ Save to storage

//       const decoded = jwtDecode(token);
//       const customerId =
//         decoded.customerId || decoded.customerID || decoded.customeId;

//       const customerData = await fetchCustomerById(customerId, token);
//       const walletData = await getWalletByUserId(decoded.UserId,token);

//       setUser(data.data);
//       setCustomer(customerData.data);
//       setWallet(walletData.data);

//       return { success: true };
//     } catch (error) {
//       console.log('AuthContext login error:', error);
//       throw new Error(error?.response?.data?.message || 'Failed to log in.');
//     }
//   };

//   const logout = async () => {
//     setUser(null);
//     setToken(null);
//     setCustomer(null);
//     await AsyncStorage.removeItem('token'); // ✅ Clear token on logout
//   };

//   if (loading) {
//     // You can return a splash screen or loader here
//     return null;
//   }

//   return (
//     <AuthContext.Provider value={{ user, token, customer,wallet, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { LoginUser, fetchCustomerById, getWalletByUserId } from '../services/authService';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and user on app start
  useEffect(() => {
    const loadStoredToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          const decoded = jwtDecode(storedToken);
          const customerId =
            decoded.customerId || decoded.customerID || decoded.customeId;

          const customerData = await fetchCustomerById(customerId, storedToken);
          const walletData = await getWalletByUserId(decoded.UserId, storedToken);
          setToken(storedToken);
          setUser({ ...decoded });
          setCustomer(customerData.data);
          setWallet(walletData.data);
        }
      } catch (error) {
        console.log('Error loading stored token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredToken();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    if (!Device.isDevice) {
      console.warn('Must use physical device for push notifications');
      return null;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Push notification permission denied');
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  };

  const login = async (credentials) => {
    try {
      const data = await LoginUser(credentials);
      const token = data.data.token;
      setToken(token);
      await AsyncStorage.setItem('token', token);

      const decoded = jwtDecode(token);
      const customerId =
        decoded.customerId || decoded.customerID || decoded.customeId;

      const customerData = await fetchCustomerById(customerId, token);
      const walletData = await getWalletByUserId(decoded.UserId, token);

      setUser(data.data);
      setCustomer(customerData.data);
      setWallet(walletData.data);

      // Register and send push token to backend
      const expoPushToken = await registerForPushNotificationsAsync();

      if (expoPushToken) {
        await fetch('https://localhost:8080/send-notification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: decoded.UserId,
            pushToken: expoPushToken,
          }),
        });
      }

      return { success: true };
    } catch (error) {
      console.log('AuthContext login error:', error);
      throw new Error(error?.response?.data?.message || 'Failed to log in.');
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    setCustomer(null);
    setWallet(null);
    await AsyncStorage.removeItem('token');
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, token, customer, wallet, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
