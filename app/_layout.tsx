import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { FavoritesProvider } from '@/context/FavoritesContext';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="placedetails" options={{ headerShown: false }} />
        <Stack.Screen name="eventsdetails" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  );
}
