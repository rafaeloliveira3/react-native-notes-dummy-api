import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  text?: string;
  onPress?: () => void;
};

export const Button: FC<ButtonProps> = ({ onPress, text }) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors[colorScheme ?? "light"].tint },
      ]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={{ color: Colors.primary.default }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    fontSize: 20,
    fontFamily: "Ubuntu_400Regular",
  },
});
