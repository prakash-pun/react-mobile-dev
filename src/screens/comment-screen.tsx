import React from "react";
import { SafeAreaView, Text } from "react-native";
import { CommentInput, CommentList } from "../components";
import { NavigationBar } from "../navigations";

interface IComments {
  style: any;
  comments: any;
  onClose: () => void;
  onSubmitComment: (comment: string) => void;
}

export function Comments({
  style,
  comments,
  onClose,
  onSubmitComment
}: IComments) {
  return (
    <SafeAreaView style={style}>
      <NavigationBar
        title={"Comments"}
        leftText={"Close"}
        onPressLeftText={onClose}
      />
      <CommentInput placeholder="Leave a comment" onSubmit={onSubmitComment} />
      <CommentList items={comments} />
    </SafeAreaView>
  );
}
