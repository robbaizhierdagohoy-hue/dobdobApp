import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MovieCard({ movie, isSaved, toggleWatchlist }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Safe fallback for poster image
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/90x130?text=No+Image";

  return (
    <View style={styles.card}>
      <Image source={{ uri: posterUrl }} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.infoText}>
          <Text style={styles.bold}>Movie title: </Text>
          {movie?.title || "Untitled"}
        </Text>

        <Text style={styles.infoText}>
          <Text style={styles.bold}>Release Date: </Text>
          {movie?.release_date || "N/A"}
        </Text>

        <Text style={styles.infoText}>
          <Text style={styles.bold}>Rating: </Text>
          {movie?.vote_average != null ? `${movie.vote_average} / 10` : "N/A"}
        </Text>

        <Text
          style={styles.infoText}
          numberOfLines={isExpanded ? undefined : 3}
        >
          <Text style={styles.bold}>Description: </Text>
          {movie?.overview || "Description unavailable."}
        </Text>

        {movie?.overview ? (
          <TouchableOpacity
            style={styles.readMoreBtn}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.readMoreText}>
              {isExpanded ? "Read Less" : "Read More..."}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity
        onPress={() => toggleWatchlist?.(movie)}
        style={[
          styles.circleButton,
          { backgroundColor: isSaved ? "#ff0000" : "#ffffff" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderWidth: 3,
    borderColor: "#f1e5e5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#0b0b0b",
    alignItems: "flex-start",
  },
  image: {
    width: 90,
    height: 130,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#2A2A2A",
  },
  details: {
    flex: 1,
    paddingRight: 20,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
    color: "#E0E0E0",
  },
  bold: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  readMoreBtn: {
    marginTop: 2,
  },
  readMoreText: {
    fontSize: 11,
    color: "#fffb00",
    fontWeight: "bold",
  },
  circleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    position: "absolute",
    top: 10,
    right: 10,
  },
});