import Constants from "expo-constants";
import { Platform, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class MeasureLayout extends Component {
  static proptypes = {
    children: PropTypes.func.isRequired
  };

  state = {
    layout: null
  };

  handleLyout = (event: any) => {
    const {
      nativeEvent: { layout }
    } = event;

    this.setState({
      layout: {
        ...layout,
        y:
          layout.y + (Platform.OS === "android" ? Constants.statusBarHeight : 0)
      }
    });
  };

  render() {
    const { children }: any = this.props;
    const { layout } = this.state;

    // Measure the available space with a placeholder view set to flex 1
    if (!layout) {
      return <View onLayout={this.handleLyout} style={styles.container} />;
    }
    return children(layout);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
