import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as Haptics from "expo-haptics";
import BottomSheet from "@gorhom/bottom-sheet";
import { data } from "../utils";
import { CalendarPicker } from "../components";

export const CalendarScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["20", "60%"], []);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<any>(data);

  const handleSheetChange = useCallback(index => {
    console.log("handleSheetChange", index);
  }, []);
  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(1);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setItems={setItems}
        setValue={setValue}
        setOpen={setOpen}
        schema={{
          label: "name",
          value: "id"
        }}
        theme="LIGHT"
        itemKey="id"
        mode="BADGE"
      />
      <Button title="One Bottom Calendar" onPress={() => handleSnapPress(0)} />
      <Button title="Close" onPress={() => handleClosePress()} />
      <CalendarPicker />
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <CalendarPicker />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 10,
    marginBottom: 30,
    justifyContent: "space-between"
  }
});
