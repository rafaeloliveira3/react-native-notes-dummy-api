import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { FC, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type inputProps = {
  placeholder?: string;
  isPassword: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

export const Input: FC<inputProps> = ({
  value,
  onChangeText,
  placeholder,
  isPassword,
}) => {
  const colorScheme = useColorScheme();
  const [secret, isSecret] = useState<boolean>(isPassword);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
          borderColor: Colors[colorScheme ?? "light"].text,
        },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secret}
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? "light"].text,
          },
        ]}
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        value={value}
        onChangeText={onChangeText}
      />
      {isPassword ? (
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={() => isSecret(!secret)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={secret ? "eye" : "eye-off"}
            size={28}
            color={Colors[colorScheme ?? "light"].text}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 4,
  },
  input: {
    flex: 1,
  },
  rightIcon: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
