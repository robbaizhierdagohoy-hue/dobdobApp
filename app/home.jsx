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
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleNavigate = (path) => {
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>DobDob TV</Text>

        {/* Menu Button */}
        <Pressable
          onPress={() => setMenuOpen((prev) => !prev)}
          style={styles.menuBtn}
        >
          <Text style={styles.menuBtnText}>Menu</Text>
        </Pressable>

        {/* Dropdown Menu */}
        {menuOpen && (
          <View style={styles.dropdownMenu}>
            <Pressable
              onPress={() => handleNavigate("/search")}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Search</Text>
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable
              onPress={() => handleNavigate("/watchlist")}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Watchlist</Text>
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable
              onPress={() => handleNavigate("/profile")}
              style={styles.menuItem}
            >
              <Text style={styles.menuItemText}>Profile</Text>
            </Pressable>
          </View>
        )}
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

      {/* Movie List Rendering */}
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
              onPress={() => {
                setMenuOpen(false);
                router.push({
                  pathname: "/details",
                  params: { movie: JSON.stringify(item) },
                });
              }}
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
    position: "relative",
    zIndex: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E50914",
  },
  menuBtn: {
    backgroundColor: "#1e1e1e",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderColor: "#E50914",
    borderWidth: 1,
  },
  menuBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
  },
  dropdownMenu: {
    position: "absolute",
    top: 46,
    right: 0,
    width: 150,
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    borderColor: "#E50914",
    borderWidth: 1.5,
    paddingVertical: 4,
    zIndex: 30,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#5a3131",
  },
  categoryContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    alignItems: "center",
  },
  categoryBtnActive: {
    backgroundColor: "#E50914",
  },
  categoryText: {
    color: "#aaaaaa",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryTextActive: {
    color: "#ffffff",
  },
});