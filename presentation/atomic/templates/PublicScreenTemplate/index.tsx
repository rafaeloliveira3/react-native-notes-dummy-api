import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";

type PublicScreenTemplateProps = {
  children: React.ReactNode;
};

export const PublicScreenTemplate: FC<PublicScreenTemplateProps> = ({
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}></View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: "40%",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
