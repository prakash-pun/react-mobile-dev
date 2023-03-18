import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import * as Haptics from "expo-haptics";
import moment from "moment";
import { getDateRange } from "../utils";

export const CalendarPicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDate, setSelectedDate] = useState<any>({});

  const handleDayPress = (date: DateData) => {
    if (!startDate) {
      setStartDate(date.dateString);
      setSelectedDate({});
    } else if (startDate && endDate) {
      setStartDate(date.dateString);
      setEndDate("");
      setSelectedDate({});
    } else {
      const isValidDate = moment(date.dateString).isSameOrAfter(startDate);
      if (isValidDate) {
        setEndDate(date.dateString);
      } else {
        setSelectedDate({});
        setStartDate(date.dateString);
        setEndDate("");
      }
    }
    Haptics.selectionAsync();
  };

  useEffect(() => {
    const markedDateObject = getDateRange(startDate, endDate);
    setSelectedDate(markedDateObject);
  }, [startDate, endDate]);

  return (
    <View style={styles.container}>
      <Text>
        Start Date: {startDate} - End Date: {endDate}
      </Text>
      <Calendar
        markingType={"period"}
        initialDate={"2022-08-27"}
        minDate={moment().format("YYYY-MM-DD").toString()}
        onDayPress={handleDayPress}
        markedDates={selectedDate}
        enableSwipeMonths={true}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: "#00adf5",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#00adf5",
          selectedDotColor: "#ffffff",
          arrowColor: "orange",
          disabledArrowColor: "#d9e1e8",
          monthTextColor: "blue",
          indicatorColor: "blue",
          textDayFontWeight: "400",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "400",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
