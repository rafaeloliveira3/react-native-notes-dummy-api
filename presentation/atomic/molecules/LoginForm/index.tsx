import { View, StyleSheet, Alert } from "react-native";
import { FC, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuth } from "@/service/firebase";
import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@/presentation/atomic/atoms";
import { useRouter } from "expo-router";

const schema = z.object({
  email: z.string().email().nonempty("Email é obrigatório"),
  password: z.string().nonempty("Senha é obrigatória"),
});

type LoginSchema = z.infer<typeof schema>;

export const LoginForm: FC = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schema),
  });
  const handleLogin = async ({ email, password }: LoginSchema) => {
    const { error, userID } = await userAuth({ email, password });
    if (!error && userID) {
      router.replace("/(private)");
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
      <Button text="Login" onPress={handleSubmit(handleLogin)} />
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
