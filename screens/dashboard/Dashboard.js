import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
    ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { screenWidth } from "../../utils/metrics";





export default function Dashboard() {
  const { customer, wallet } = useContext(AuthContext);
    return (
    <ScrollView style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.greeting}>Good Morning {customer?.fullName} </Text>

      {/* Wallet Card */}
      <View style={styles.walletCard}>
        <Text style={styles.walletTitle}>Total Wallet</Text>
        <Text style={styles.walletAmount}>₦150,000</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Info Box */}
      <View style={styles.infoCard}>
        <Text style={styles.infoText}>🎉 WOW! You're 50% to your savings goal</Text>
      </View>

      {/* To-do List */}
      <View style={styles.todoContainer}>
        <Text style={styles.todoTitle}>To-do List:</Text>
        <View style={styles.todoItem}><Text>☐ Complete KYC Form</Text></View>
        <View style={styles.todoItem}><Text>☐ Check Financial Status</Text></View>
        <View style={styles.todoItem}><Text>☐ Refer and Earn</Text></View>
        <View style={styles.todoItem}><Text>☐ Explore Extra Income</Text></View>
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Nunito Sans",
  },
  greeting: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Nunito Sans",
    marginBottom: 20,
  },

  // Wallet Card
  walletCard: {
    backgroundColor: "#30004A",
    borderRadius: 12,
    padding: 20,
    width: screenWidth - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  walletTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  walletAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  withdrawButton: {
    marginTop: 15,
    backgroundColor: "#c6c7c4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  withdrawText: {
    color: "#000",
    fontWeight: "600",
  },

  // Info Box
  infoCard: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    padding: 15,
    width: screenWidth - 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  // To-do List
  todoContainer: {
    width: screenWidth - 40,
    alignSelf: "center",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  todoItem: {
    marginBottom: 8,
  },
});

