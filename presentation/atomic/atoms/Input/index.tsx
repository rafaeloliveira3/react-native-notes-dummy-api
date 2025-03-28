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

type inputProps = TextInputProps & {
  placeholder?: string;
  isPassword: boolean;
};

export const Input: FC<inputProps> = ({
  value,
  onChangeText,
  placeholder,
  isPassword,
  ...rest
}) => {
  const [secret, isSecret] = useState<boolean>(isPassword);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secret}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        {...rest}
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
            color="#000"
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
    backgroundColor: Theme.base,
    borderColor: Theme.key,
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    height: 40,
    paddingHorizontal: 4,
  },
  input: {
    width: "90%",
  },
  rightIcon: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
