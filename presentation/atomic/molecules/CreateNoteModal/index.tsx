import { FC, useState } from "react";
import { Input, TextArea } from "../../atoms";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNotes } from "@/data";
import { Theme } from "@/themes/Colors";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
});
type CreateNoteSchema = z.infer<typeof schema>;

type CreateNoteModalProps = {
  closeModalFunction: () => void;
};

export const CreateNoteModal: FC<CreateNoteModalProps> = ({
  closeModalFunction,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteSchema>({
    resolver: zodResolver(schema),
  });

  const { createNotes } = useNotes();

  const handleCreate = ({ title, description }: CreateNoteSchema) => {
    createNotes({
      userId: 1,
      title: title,
      body: description,
    });
    closeModalFunction();
  };

  return (
    <>
      <Text style={styles.title}>Adicionar Post</Text>
      <View style={styles.modalContainer}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Título"
              isPassword={false}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextArea
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Descrição"
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit(handleCreate)}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Adicionar</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
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
  modalContainer: {
    gap: 16,
  },
});
