import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/LOGO.jpg";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backTxt}>Back</Text>
      </Pressable>

      <View style={styles.avatarContainer}>
        <Image source={Logo} style={styles.avatar} />
      </View>

      <Text style={styles.userName}>Robb Dagohoy</Text>
      <Text style={styles.userRole}>BS IT Student / Developer</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Application Info</Text>
        <Text style={styles.cardItem}>App Name: DobDob TV</Text>
        <Text style={styles.cardItem}>Version: 2.0</Text>
        <Text style={styles.cardItem}>
          Framework: React Native / Expo Router
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    paddingTop: 50,
  },
  backBtn: { 
    marginBottom: 20 
  },
  backTxt: { 
    color: "#E50914", 
    fontSize: 14, 
    fontWeight: "bold" 
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginTop: 5,
    borderColor: "#E50914",
    borderWidth: 2,
    justifyContent: "center",
    alignSelf: "center",
  },
  userName: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  userRole: {
    color: "#888",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
  },
  card: { 
    backgroundColor: "#1e1e1e", 
    padding: 20, 
    borderRadius: 8 
  },
  cardTitle: {
    color: "#E50914",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardItem: { 
    color: "#ccc", 
    fontSize: 14, 
    marginBottom: 6 
  },
});
