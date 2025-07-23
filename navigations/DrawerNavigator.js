import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { AuthContext } from "../context/AuthContext";

// Screens
import Wallet from "../screens/wallet/wallet";
import Transaction from "../screens/transactions/transaction";
import Leave from "../screens/leave/leave";
import Dashboard from "../screens/dashboard/Dashboard";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const { logout, customer, user } = useContext(AuthContext);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const themeStyles = getStyles(isDark);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* Drawer Header */}
      <View style={themeStyles.drawerHeader}>
        <Image
          source={require("../assets/images/logo.png")}
          style={themeStyles.logo}
        />
        <Text style={themeStyles.appName}>Fintech HR</Text>

        {/* User Info */}
        <View style={themeStyles.profileContainer}>
          <Image
            source={require("../assets/images/user.png")}
            style={themeStyles.avatar}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={themeStyles.userName}>
              {customer?.fullName || "User"}
            </Text>
            <Text style={themeStyles.userEmail}>
              {user?.emailaddress || "user@example.com"}
            </Text>
          </View>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={themeStyles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer */}
      <View style={themeStyles.footer}>
        <TouchableOpacity onPress={logout} style={themeStyles.logoutBtn}>
          <Text style={themeStyles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          backgroundColor: isDark ? "#000" : "#E19F21",
          width: 260,
        },
        headerStyle: {
          backgroundColor: isDark ? "#1c1c1e" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#082F7C",
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: "#bbb",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginLeft: -5,
        },
        drawerItemStyle: {
          borderRadius: 4,
          marginHorizontal: 10,
        },
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Wallet" component={Wallet} />
      <Drawer.Screen name="Leaves" component={Leave} />
      <Drawer.Screen name="Transactions" component={Transaction} />
    </Drawer.Navigator>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    drawerHeader: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: isDark ? "#1c1c1e" : "#E19F21",
      alignItems: "center",
    },
    logo: {
      width: 60,
      height: 60,
      resizeMode: "contain",
      marginBottom: 10,
    },
    appName: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 15,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDark ? "#2c2c2e" : "#E19F21",
      padding: 12,
      borderRadius: 12,
      width: "100%",
      marginTop: 20,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    userName: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    userEmail: {
      color: "#ccc",
      fontSize: 12,
    },
    menuSection: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: isDark ? "#000" : "#082F7C",
    },
    footer: {
      padding: 20,
      borderTopWidth: 1,
      borderColor: isDark ? "#333" : "#eee",
      backgroundColor: isDark ? "#000" : "#082F7C",
    },
    logoutBtn: {
      backgroundColor: isDark ? "#444" : "#E19F21",
      paddingVertical: 10,
      borderRadius: 8,
      alignItems: "center",
    },
    logoutText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
  });

export default DrawerNavigator;
