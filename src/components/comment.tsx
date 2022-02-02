import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, ScrollView } from "react-native";

export function CommentInput({
  placeholder,
  onSubmit
}: {
  placeholder: string;
  onSubmit: any;
}) {
  const [comment, setComment] = useState("");

  const handleChangeText = (comment: string): void => {
    setComment(comment);
  };

  const handleSubmit = (): void => {
    if (!comment) return;

    onSubmit(comment);
    setComment("");
  };
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={comment}
        style={styles.input}
        underlineColorAndroid={"transparent"}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
      />
    </View>
  );
}

export function CommentList({ items }: any) {
  const renderItem = (item: any, index: any) => (
    <View key={index} style={styles.comment}>
      <Text>{item}</Text>
    </View>
  );
  return <ScrollView>{items.map(renderItem)}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 20,
    height: 60
  },
  input: {
    // flex: 1
  },
  comment: {
    marginLeft: 20,
    paddingVertical: 20,
    paddingRight: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.05)"
  }
});
