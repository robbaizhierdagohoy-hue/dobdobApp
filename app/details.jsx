import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StorageService } from "../services/storageService";

export default function DetailsScreen() {
  const router = useRouter();
  const { movie } = useLocalSearchParams();
  const movieData = movie ? JSON.parse(movie) : {};
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    checkWatchlistStatus();
  }, []);

  const checkWatchlistStatus = async () => {
    const list = (await StorageService.loadData("watchlist")) || [];
    setInWatchlist(list.some((item) => item.id === movieData.id));
  };

  const toggleWatchlist = async () => {
    const list = (await StorageService.loadData("watchlist")) || [];
    let updated;
    if (inWatchlist) {
      updated = list.filter((item) => item.id !== movieData.id);
      setInWatchlist(false);
    } else {
      updated = [...list, movieData];
      setInWatchlist(true);
    }
    await StorageService.saveData("watchlist", updated);
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backTxt}>Back</Text>
      </Pressable>

      <Image
        source={{
          uri: movieData.poster_path
            ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
            : "https://via.placeholder.com/300",
        }}
        style={styles.backdrop}
      />

      <Text style={styles.title}>{movieData.title}</Text>
      <Text style={styles.rating}>Rating: {movieData.vote_average} / 10</Text>
      <Text style={styles.releaseDate}>Release Date: {movieData.release_date}</Text>
      <Text style={styles.overview}>
        {movieData.overview || "No overview available."}
      </Text>

      <Pressable
        style={[styles.actionBtn, inWatchlist && styles.removeBtn]}
        onPress={toggleWatchlist}
      >
        <Text style={styles.actionTxt}>
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Text>
      </Pressable>
    </ScrollView>
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
    marginBottom: 16,
    borderRadius: 8,
    marginRight: 300,
    backgroundColor: "#E50914",
  },
  backTxt: {
    color: "#020202",
    fontSize: 14,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
  },
  backdrop: {
    width: "80%",
    height: 380,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: "#dacccd",
    borderWidth: 2,
    alignSelf: "center",
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 8 
  },
  rating: {
    fontSize: 16,
    color: "#ffcc00",
    fontWeight: "bold",
    marginBottom: 16,
  },
  releaseDate: { 
    fontSize: 14, 
    color: "#ffffff", 
    marginBottom: 16 
  },
  overview: { 
    fontSize: 14, 
    color: "#ccc", 
    lineHeight: 22, 
    marginBottom: 24 
  },
  actionBtn: {
    backgroundColor: "#E50914",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  removeBtn: { 
    backgroundColor: "#444444" 
  },
  actionTxt: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" },
});
