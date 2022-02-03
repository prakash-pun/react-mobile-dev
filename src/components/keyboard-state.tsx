import React from "react";
import { Keyboard, Platform } from "react-native";
import PropTypes from "prop-types";

const INITIAL_ANIMATION_DURATION = 250;

export default class KeyboardState extends React.Component {
  // [x: string]: any;
  static propTypes = {
    layout: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired,
    children: PropTypes.func.isRequired
  };
  subscriptions: any;

  constructor(props: any) {
    super(props);

    const {
      layout: { height }
    } = props;

    this.state = {
      contentHeight: height,
      keyboardHeight: 0,
      keyboardVisible: false,
      keyboardWillShow: false,
      KeyboardWillHide: false,
      keyboardAnimationDuration: INITIAL_ANIMATION_DURATION
    };
  }

  componentWillMount() {
    if (Platform.OS === "ios") {
      this.subscriptions = [
        Keyboard.addListener("keyboardWillShow", this.keyboardWillShow),
        Keyboard.addListener("keyboardWillHide", this.keyboardWillHide),
        Keyboard.addListener("keyboardDidShow", this.keyboardDidShow),
        Keyboard.addListener("keyboardDidHide", this.keyboardDidHide)
      ];
    } else {
      this.subscriptions = [
        Keyboard.addListener("keyboardDidHide", this.keyboardDidHide),
        Keyboard.addListener("keyboardDidShow", this.keyboardDidShow)
      ];
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((subscription: { remove: () => any }) =>
      subscription.remove()
    );
  }

  keyboardWillShow = (event: any) => {
    this.setState({ keyboardWillShow: true });
    this.measure(event);
  };

  keyboardDidShow = () => {
    this.setState({
      keyboardWillShow: false,
      keyboardVisible: true
    });
    this.measure(event);
  };
  keyboardWillHide = (event: any) => {
    this.setState({ keyboardWillHide: true });
    this.measure(event);
  };
  keyboardDidHide = () => {
    this.setState({
      keyboardWillHide: false,
      keyboardVisible: false
    });
  };

  measure = (event: any) => {
    const { layout }: any = this.props;
    const {
      endCoordinates: { height, screenY },
      duration = INITIAL_ANIMATION_DURATION
    } = event;
    this.setState({
      contentHeight: screenY - layout.y,
      keyboardHeight: height,
      keyboardAnimationDuration: duration
    });
  };
  render() {
    const { children, layout }: any = this.props;
    const {
      contentHeight,
      keyboardHeight,
      keyboardVisible,
      keyboardWillShow,
      keyboardWillHide,
      keyboardAnimationDuration
    }: any = this.state;
    return children({
      containerHeight: layout.height,
      contentHeight,
      keyboardHeight,
      keyboardVisible,
      keyboardWillShow,
      keyboardWillHide,
      keyboardAnimationDuration
    });
  }
}
