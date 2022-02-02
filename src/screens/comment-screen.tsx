import React from "react";
import { SafeAreaView, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
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

Comments.propTypes = {
  style: ViewPropTypes.style,
  comments: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  onSubmitComment: PropTypes.func.isRequired
};

Comments.defaultProps = {
  style: null
};
