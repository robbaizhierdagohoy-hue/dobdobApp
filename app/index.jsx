import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/LOGO.jpg"; 

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.logoBadge}>
        <Text style={styles.logoText}>DobDob TV</Text>
      </View>
        <Image source={Logo} style={styles.logo} />
      <Text style={styles.subtitle}>
        Discover, search, and save movie watchlist.
      </Text>
      <TouchableOpacity
        style={styles.exploreBtn}
        onPress={() => router.push("/home")} 
      >
        <Text style={styles.btnText}>Explore Movies</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo:{
    width: 210, 
    height: 200,
    borderRadius: 100, 
    marginBottom: 20,
    borderColor: "#fefeff",
    borderWidth: 3,
    alignSelf: "center",
  },
  logoBadge: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: "#2742bf",
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  exploreBtn: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});