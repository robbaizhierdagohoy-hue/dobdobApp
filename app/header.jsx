import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header({ activeTab, setActiveTab, watchlistCount }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>DobDob TV</Text>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            { backgroundColor: activeTab === "watchlist" ? "#007bff" : "#f0f0f0" },
          ]}
          onPress={() => setActiveTab("watchlist")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "watchlist" ? "#fff" : "#000" },
            ]}
          >
            Watchlist ({watchlistCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            { backgroundColor: activeTab === "search" ? "#007bff" : "#f0f0f0" },
          ]}
          onPress={() => setActiveTab("search")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "search" ? "#fff" : "#000" },
            ]}
          >
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 18,
    marginTop: 20,
  },
  headerTitle: {
    paddingVertical: 10,
    marginLeft: 60,
    marginRight: 60,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 30,
    borderColor: "#5b6ff0",
    borderWidth: 4,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
  },
});