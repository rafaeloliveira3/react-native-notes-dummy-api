import { View, TextInput, StyleSheet } from "react-native";
import { FC } from "react";
import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type textAreaProps = {
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
};

export const TextArea: FC<textAreaProps> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  const colorScheme = useColorScheme();
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
        style={[
          styles.input,
          {
            color: Colors[colorScheme ?? "light"].text,
          },
        ]}
        value={value}
        placeholderTextColor={Colors[colorScheme ?? "light"].text}
        onChangeText={onChangeText}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 4,
    height: 100,
  },
  input: {
    width: "100%",
    height: "100%",
    textAlignVertical: "top",
  },
});
