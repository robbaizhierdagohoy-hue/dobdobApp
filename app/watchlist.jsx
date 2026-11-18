import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { StorageService } from "../services/storageService";
import MovieCard from "../components/moviecard"; 

export default function WatchlistScreen() {
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    const data = await StorageService.loadData("watchlist");
    if (data) setWatchlist(data);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backTxt}>Back</Text>
      </Pressable>

      <Text style={styles.header}>My Saved Watchlist</Text>

      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/details",
                params: { movie: JSON.stringify(item) },
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your watchlist is empty.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
    paddingTop: 50,
  },
  backBtn: {
    marginBottom: 16,
    borderRadius: 8,
    marginRight: 300,
    backgroundColor: "#E50914",
  },
  backTxt: {
    color: "#000000",
    fontSize: 14,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 20 
  },
  empty: { 
    color: "#777", 
    textAlign: "center", 
    marginTop: 40 
  },
});
