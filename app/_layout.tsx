import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ubuntu_500Medium, Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import { Colors } from "@/themes/Colors";
import { NotesProvider } from "@/data";
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(public)/index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Ubuntu_500Medium,
    Ubuntu_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="light" backgroundColor={Colors.primary.tint} />
        <NotesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(public)/index" />
            <Stack.Screen name="(private)/index" />
          </Stack>
        </NotesProvider>
      </SafeAreaView>
    </ThemeProvider>
  );
}
