import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import moment from "moment";
import { DateData } from "react-native-calendars";
import { data, getDateRange } from "../utils";
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
      <TextInput />
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
  }
});
