import { FC, useEffect } from "react";
import { Button, Input, TextArea } from "@/presentation/atomic/atoms";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNotes } from "@/data";
import { Colors } from "@/themes/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().nonempty("Título é obrigatório"),
  description: z.string().nonempty("Descrição é obrigatória"),
});
type CreateNoteFormSchema = z.infer<typeof schema>;

type CreateNoteFormProps = {
  closeModalFunction: () => void;
};

export const CreateNoteForm: FC<CreateNoteFormProps> = ({
  closeModalFunction,
}) => {
  const colorScheme = useColorScheme();
  const { createNotes } = useNotes();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateNoteFormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (errors.title) {
      Alert.alert("Erro", "Título é obrigatório");
      return;
    }
    if (errors.description) {
      Alert.alert("Erro", "Descrição é obrigatória");
      return;
    }
  }, [errors]);

  const handleCreate = ({ title, description }: CreateNoteFormSchema) => {
    createNotes({
      userId: 1,
      title: title,
      body: description,
    });
    closeModalFunction();
  };

  return (
    <>
      <Text
        style={[styles.title, { color: Colors[colorScheme ?? "light"].text }]}
      >
        Adicionar Post
      </Text>
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
      <Button onPress={handleSubmit(handleCreate)} text={"Adicionar"} />
    </>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Ubuntu_500Medium",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary.default,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.primary.default,
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    gap: 16,
  },
});
