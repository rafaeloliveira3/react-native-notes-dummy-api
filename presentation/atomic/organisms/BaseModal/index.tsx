import { FC, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  ModalProps,
  Pressable,
  StyleSheet,
} from "react-native";
import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type BaseModalProps = ModalProps & {
  children: ReactNode;
};

export const BaseModal: FC<BaseModalProps> = ({ children, ...rest }) => {
  const colorScheme = useColorScheme();
  return (
    <KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} {...rest}>
        <Pressable style={styles.modalContainer} onPress={rest.onRequestClose}>
          <Pressable
            style={[
              styles.modalBox,
              {
                backgroundColor: Colors[colorScheme ?? "light"].cardBackground,
              },
            ]}
            onPress={() => {}}
          >
            {children}
          </Pressable>
        </Pressable>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    borderRadius: 16,
    padding: 16,
    width: "90%",
    gap: 32,
  },
});
