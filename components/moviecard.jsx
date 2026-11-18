import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

/**
 * Reusable MovieCard component.
 * Keeps UI components modular and adheres to SOLID principles.
 */
export default function MovieCard({ item, onPress }) {
  const releaseYear = item.release_date ? item.release_date.split('-')[0] : 'N/A';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image 
        source={{ 
          uri: item.poster_path 
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}` 
            : 'https://via.placeholder.com/150' 
        }} 
        style={styles.poster}
      />
      <View style={styles.cardDetails}>
        <Text style={styles.movieTitle} numberOfLines={1}>{item.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.rating}>Rating: {rating} / 10</Text>
          <Text style={styles.movieMeta}>Release Date: {releaseYear}</Text>
        </View>
        <Text style={styles.overviewSnippet} numberOfLines={3}>
          {item.overview || 'No description available.'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#1e1e1e', 
    borderRadius: 8, 
    marginBottom: 12, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dacccd'
    },
  poster: { 
    width: 90, 
    height: 140 
    },
  cardDetails: { 
    flex: 1, 
    padding: 12, 
    justifyContent: 'center' 
    },
  movieTitle: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4 
    },
  movieMeta: { 
    color: '#ffffff', 
    fontSize: 12 
    },
  rating: { 
    color: '#ffcc00', 
    fontSize: 12, 
    fontWeight: 'bold' },
  overviewSnippet: { 
    color: '#aaaaaa', 
    fontSize: 11, 
    lineHeight: 15 
}
});