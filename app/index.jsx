import { useRouter } from "expo-router";
import { StyleSheet, Text, View, Pressable } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DobDob TV </Text>
      <Text style={styles.subtitle}>Stream, Discover, and Organize Your Favorite Movies</Text>
      <Pressable style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Discover movies...</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212', padding: 24 },
  logo: { fontSize: 40, fontWeight: 'bold', color: '#E50914', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#aaaaaa', textAlign: 'center', marginBottom: 36, lineHeight: 22 },
  button: { backgroundColor: '#E50914', paddingVertical: 16, paddingHorizontal: 36, borderRadius: 8 },
  buttonText: { color: '#ffffff', fontSize: 18, fontWeight: 'bold' }
});