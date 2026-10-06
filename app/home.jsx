import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import Header from "../src/components/header.jsx";
import MovieCard from "../src/components/movieCard.jsx";
import { fetchMoviesFromAPI } from "../src/api.jsx";

export default function Home() {
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("search");

  const handleBack = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/"); 
  }
  };

  const loadMovies = async (query = "") => {
    setLoading(true);
    const data = await fetchMoviesFromAPI(query);
    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleSearchSubmit = () => {
    loadMovies(searchQuery);
  };

  const toggleWatchlist = (movie) => {
    if (watchlist.some((item) => item.id === movie.id)) {
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  };

  const displayedList = activeTab === "watchlist" ? watchlist : movies;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.topNavigation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
        >
          <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          watchlistCount={watchlist.length}
        />

        {activeTab === "search" && (
          <View style={styles.searchForm}>
            <TextInput
              placeholder="Search movies..."
              placeholderTextColor="#d6d5d5"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              style={styles.searchInput}
            />
            <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchBtn}>
              <Text style={styles.searchBtnText}>Search</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={displayedList}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                isSaved={watchlist.some((savedItem) => savedItem.id === item.id)}
                toggleWatchlist={toggleWatchlist}
              />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No movies found.</Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  topNavigation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  backButton: {
    backgroundColor: "#252021",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333333",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  searchForm: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#FFFFFF",
  },
  searchBtn: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  searchBtnText: {
    color: "#121212",
    fontWeight: "bold",
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#AAAAAA",
  },
});