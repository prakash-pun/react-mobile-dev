import { useState, useRef, useMemo, useCallback } from "react";
import { StyleSheet, View, Button, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import BottomSheet from "@gorhom/bottom-sheet";
import { CalendarPicker } from "../components";
import { data } from "../utils";

export const CalendarScreen = () => {
  const scrollViewRef: any = useRef<null | ScrollView>(null);
  const onButtonClick = () => {
    scrollViewRef.current?.scrollToEnd({ x: 0, y: 0 });
  };

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
      {/* <TextInput ref={inputEl} placeholder="Please Test Work" /> */}
      <Button title="Test Button" onPress={onButtonClick} />

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
      <BottomSheet
        index={-1}
        ref={sheetRef}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <CalendarPicker />
      </BottomSheet>

      {/* <ScrollView ref={scrollViewRef}>
        <TextInput placeholder="test" />
        <View style={styles.contain}>
          <Text style={styles.text}>This is the another text</Text>
          <Text style={styles.text}>This is the another text</Text>
          <Text style={styles.text}>This is the another text</Text>
          <Text style={styles.text}>This is the another text</Text>
        </View>
        <Text style={styles.text}>This is the end test</Text>
      </ScrollView> */}
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
  },
  contain: {
    height: 500,
    backgroundColor: "azure"
  },
  text: {
    color: "brown",
    fontSize: 20
  }
});
