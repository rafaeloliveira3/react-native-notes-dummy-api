import { FC, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import logoMonocromatic from "@/assets/images/monocromatic-isotipo.png";
import { Theme } from "@/themes/Colors";
import { BaseModal } from "../../organisms";
import { CreateNoteModal } from "../../molecules/CreateNoteModal";

type PrivateScreenTemplateProps = {
  children: React.ReactNode;
};

export const PrivateScreenTemplate: FC<PrivateScreenTemplateProps> = ({
  children,
}) => {
  const [showAddNotesModal, setShowAddNotesModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoMonocromatic}></Image>
      </View>
      <Text style={styles.title}>Mural de Recados</Text>
      <BaseModal
        visible={showAddNotesModal}
        onRequestClose={() => setShowAddNotesModal(false)}
      >
        <CreateNoteModal
          closeModalFunction={() => setShowAddNotesModal(false)}
        />
      </BaseModal>
      {children}
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.addButton}
        onPress={() => setShowAddNotesModal(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
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
    backgroundColor: Theme.default,
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
    color: Theme.base,
    fontSize: 28,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: Theme.default,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Theme.base,
    fontWeight: "bold",
    fontSize: 16,
  },
});
