import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FC, useEffect } from "react";
import logo from "@/assets/images/logotipo.png";
import logoWhite from "@/assets/images/logo-white.png";
import { PublicScreenTemplate } from "../PublicScreenTemplate";
import { Colors } from "@/themes/Colors";
import { useRouter } from "expo-router";
import { RegisterForm } from "@/presentation/atomic/molecules/";

import { useColorScheme } from "@/hooks/useColorScheme";
import Animated, {
  FadeInDown,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

export const RegisterTemplate: FC = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const logoScale = useSharedValue(0.8);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 500 });
  }, []);

  const logoAnimation = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <PublicScreenTemplate>
      <View style={styles.cardOverlay}>
        <Animated.View
          entering={FadeInDown.duration(500)
            .delay(200)
            .damping(50)
            .withInitialValues({ transform: [{ translateY: 100 }] })}
          style={[
            styles.card,
            { backgroundColor: Colors[colorScheme ?? "light"].cardBackground },
          ]}
        >
          <Animated.Image
            style={logoAnimation}
            source={colorScheme == "light" ? logo : logoWhite}
          ></Animated.Image>
          <View
            style={{
              borderBottomColor: Colors.primary.tint,
              borderBottomWidth: 2,
              width: "100%",
            }}
          ></View>
          <Text
            style={[
              styles.title,
              { color: Colors[colorScheme ?? "light"].text },
            ]}
          >
            CRIAR NOVA CONTA
          </Text>
          <RegisterForm />
          <TouchableOpacity onPress={() => router.replace("/(public)")}>
            <Text style={{ color: Colors[colorScheme ?? "light"].text }}>
              Já tem uma conta? Faça login!
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </PublicScreenTemplate>
  );
};

const styles = StyleSheet.create({
  cardOverlay: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 28,
    paddingVertical: 40,
    gap: 16,
    boxShadow: "0px 0px 50px 5px #00000026",
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontFamily: "Ubuntu_500Medium",
  },
});
