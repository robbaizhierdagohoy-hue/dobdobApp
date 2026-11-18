import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { ApiService } from "../services/apiservice";
import MovieCard from "../components/moviecard";

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("trending");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoryData(activeCategory);
  }, [activeCategory]);

  const loadCategoryData = async (category) => {
    setLoading(true);
    let result = [];
    if (category === "trending") result = await ApiService.fetchTrending();
    else if (category === "top_rated")
      result = await ApiService.fetchTopRated();
    else if (category === "new_releases")
      result = await ApiService.fetchNewReleases();
    setMovies(result);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DobDob TV</Text>
        <View style={styles.navButtons}>
          <Pressable
            onPress={() => router.push("/search")}
            style={styles.navBtn}
          >
            <Text style={styles.navText}>Search</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/watchlist")}
            style={styles.navBtn}
          >
            <Text style={styles.navText}>Watchlist</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/profile")}
            style={styles.navBtn}
          >
            <Text style={styles.navText}>Profile</Text>
          </Pressable>
        </View>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <Pressable
          style={[
            styles.categoryBtn,
            activeCategory === "trending" && styles.categoryBtnActive,
          ]}
          onPress={() => setActiveCategory("trending")}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "trending" && styles.categoryTextActive,
            ]}
          >
            Trending
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.categoryBtn,
            activeCategory === "top_rated" && styles.categoryBtnActive,
          ]}
          onPress={() => setActiveCategory("top_rated")}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "top_rated" && styles.categoryTextActive,
            ]}
          >
            Top Rated
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.categoryBtn,
            activeCategory === "new_releases" && styles.categoryBtnActive,
          ]}
          onPress={() => setActiveCategory("new_releases")}
        >
          <Text
            style={[
              styles.categoryText,
              activeCategory === "new_releases" && styles.categoryTextActive,
            ]}
          >
            New Releases
          </Text>
        </Pressable>
      </View>

      {/* Movie List Rendering using MovieCard Blueprint */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#E50914"
          style={{ marginTop: 50 }}
        />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#E50914" 
  },
  navButtons: { 
    flexDirection: "row", 
    gap: 6 
  },
  navBtn: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderColor: "#E50914",
    borderWidth: 2,
  },
  navText: { 
    color: "#ffffff", 
    fontSize: 12, 
    fontWeight: "bold" },
  categoryContainer: { 
    flexDirection: "row", 
    gap: 8, 
    marginBottom: 16 },
  categoryBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    alignItems: "center",
  },
  categoryBtnActive: { 
    backgroundColor: "#E50914" 
  },
  categoryText: { 
    color: "#aaaaaa", 
    fontSize: 12, 
    fontWeight: "bold" 
  },
  categoryTextActive: { 
    color: "#ffffff" 
  },
});
