import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ApiService } from '../services/apiservice';
import MovieCard from '../components/moviecard'; 

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (text) => {
    setQuery(text);
    if (text.trim().length > 2) {
      const data = await ApiService.searchMovies(text);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backTxt}>Back</Text>
      </Pressable>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for movies..."
        placeholderTextColor="#777"
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieCard 
            item={item} 
            onPress={() => router.push({ pathname: '/details', params: { movie: JSON.stringify(item) } })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 16, paddingTop: 50 },
  backBtn: { marginBottom: 16, borderRadius: 8, marginRight: 300, backgroundColor: '#E50914'},
  backTxt: { color: '#020202', fontSize: 14 , textAlign: 'center', padding: 5, fontWeight: 'bold'},
  searchInput: { backgroundColor: '#1e1e1e', color: '#fff', padding: 14, borderRadius: 8, marginBottom: 16, fontSize: 16 }
});