import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FC, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Theme } from "@/themes/Colors";

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
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Theme.base,
    borderColor: Theme.key,
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
