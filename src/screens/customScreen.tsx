import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { CustomFooter } from "../components/customFooter";

const CustomScreen = () => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  return (
    <View style={styles.container}>
      <BottomSheet
        index={1}
        snapPoints={snapPoints}
        footerComponent={CustomFooter}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  }
});

export { CustomScreen };
