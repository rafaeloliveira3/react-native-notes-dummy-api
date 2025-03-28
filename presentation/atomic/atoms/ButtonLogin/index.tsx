import { Theme } from "@/themes/Colors";
import { Ubuntu_400Regular } from "@expo-google-fonts/ubuntu";
import { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { TouchableOpacityProps } from "react-native-gesture-handler";

type ButtonLoginProps = TouchableOpacityProps & {
  onPress?: () => void;
};

export const ButtonLogin: FC = ({ onPress }: ButtonLoginProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={{ color: Theme.base }}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.default,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    fontSize: 20,
    fontFamily: "Ubuntu_400Regular",
  },
});
