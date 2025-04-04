import { FC } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type NoteCardProps = {
  title: string;
  description: string;
  openModalFunction: () => void;
  selectCurrentNote: () => void;
  handleDeleteFunction?: () => void;
};

export const NoteCard: FC<NoteCardProps> = ({
  openModalFunction,
  selectCurrentNote,
  handleDeleteFunction,
  title,
  description,
}) => {
  const colorScheme = useColorScheme();
  const editNoteHelpers = () => {
    selectCurrentNote?.();
    openModalFunction();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.cardContainer,
        { backgroundColor: Colors[colorScheme ?? "light"].cardBackground },
      ]}
    >
      <Text
        style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
      >
        {title}
      </Text>
      <Text
        style={[
          styles.description,
          { color: Colors[colorScheme ?? "light"].text },
        ]}
      >
        {description}
      </Text>
      <View style={styles.cardOptionContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cardOptionButton}
          onPress={editNoteHelpers}
        >
          <MaterialIcons name="edit" size={18} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cardOptionButton}
          onPress={handleDeleteFunction}
        >
          <MaterialIcons name="delete" size={18} color={"#d42626"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 16,
    gap: 8,
    borderRadius: 12,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    fontWeight: "normal",
  },
  cardOptionContainer: {
    flexDirection: "row",
    gap: 4,
    alignSelf: "flex-end",
  },
  cardOptionButton: {
    borderRadius: 4,
    alignSelf: "center",
    backgroundColor: "#e3e3e3",
    padding: 4,
  },
});
