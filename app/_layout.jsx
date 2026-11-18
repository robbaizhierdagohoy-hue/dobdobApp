import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#121212' } }}>
      <Stack.Screen name="index" options={{ title: "Welcome" }} />
      <Stack.Screen name="home" options={{ title: "Dashboard" }} />
      <Stack.Screen name="search" options={{ title: "Search Movies" }} />
      <Stack.Screen name="details" options={{ title: "Movie Details" }} />
      <Stack.Screen name="watchlist" options={{ title: "My Watchlist" }} />
      <Stack.Screen name="profile" options={{ title: "User Profile" }} />
    </Stack>
  );
}