import { FC, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Appearance,
} from "react-native";
import logoMonocromatic from "@/assets/images/monocromatic-isotipo.png";
import { Colors } from "@/themes/Colors";

import { useColorScheme } from "@/hooks/useColorScheme";
type PrivateScreenTemplateProps = {
  children: React.ReactNode;
  openCreateNotesModalFunction: () => void;
};

export const PrivateScreenTemplate: FC<PrivateScreenTemplateProps> = ({
  children,
  openCreateNotesModalFunction,
}) => {
  const colorScheme = useColorScheme();
  const [themeSwitch, setThemeSwitch] = useState(
    colorScheme === "light" ? false : true
  );
  const [isTheFirstLoad, setIsTheFirstLoad] = useState(true);

  useEffect(() => {
    if (isTheFirstLoad) {
      setIsTheFirstLoad(false);
      return;
    }
    colorScheme === "light"
      ? Appearance.setColorScheme("dark")
      : Appearance.setColorScheme("light");
  }, [themeSwitch]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoMonocromatic}></Image>
        <Switch
          value={themeSwitch}
          onValueChange={() => setThemeSwitch(!themeSwitch)}
        />
      </View>
      <Text
        style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
      >
        Mural de Recados
      </Text>
      {children}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.addButton, { backgroundColor: Colors.primary.tint }]}
        onPress={openCreateNotesModalFunction}
      >
        <Text style={[styles.addButtonText, { color: Colors.primary.default }]}>
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  header: {
    height: "10%",
    width: "100%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderStartEndRadius: 24,
    borderEndEndRadius: 24,
  },
  cardsContainer: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontFamily: "Ubuntu_500Medium",
  },
  addButton: {
    position: "absolute",
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    bottom: 24,
    right: 24,
    elevation: 5,
  },
  modalContainer: {
    gap: 16,
  },
  addButtonText: {
    fontSize: 28,
  },
});
