import { View, StyleSheet, Alert } from "react-native";
import { FC, useEffect } from "react";
import { Button, Input } from "@/presentation/atomic/atoms";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userCreate } from "@/service/firebase";
import { useRouter } from "expo-router";

const schema = z.object({
  email: z.string().email().nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type RegisterSchema = z.infer<typeof schema>;

export const RegisterForm: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(schema),
  });
  const handleRegister = async ({ email, password }: RegisterSchema) => {
    const { error, userID } = await userCreate({ email, password });
    if (!error && userID) {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      router.replace("/(public)");
    }
  };

  useEffect(() => {
    if (errors.email) {
      Alert.alert("Erro", "Insira um email válido");
      return;
    }
    if (errors.password) {
      Alert.alert("Erro", "Senha é obrigatória");
      return;
    }
  }, [errors]);

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <Input
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Email"
            isPassword={false}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <Input
            value={field.value}
            onChangeText={field.onChange}
            placeholder="Senha"
            isPassword={true}
          />
        )}
      />
      <Button text={"Cadastrar"} onPress={handleSubmit(handleRegister)} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
});
