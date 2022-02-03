import {
  BackHandler,
  LayoutAnimation,
  Platform,
  UIManager,
  View
} from "react-native";
import PropTypes from "prop-types";
import React from "react";

export const INPUT_METHOD = {
  NONE: "NONE",
  KEYBOARD: "KEYBOARD",
  CUSTOM: "CUSTOM"
};

export default class MessagingContainer extends React.Component {
  static propTypes = {
    // From `KeyboardState`
    containerHeight: PropTypes.number.isRequired,
    contentHeight: PropTypes.number.isRequired,
    keyboardHeight: PropTypes.number.isRequired,
    keyboardVisible: PropTypes.bool.isRequired,
    keyboardWillShow: PropTypes.bool.isRequired,
    keyboardWillHide: PropTypes.bool.isRequired,
    keyboardAnimationDuration: PropTypes.number.isRequired,
    // Managing the IME type
    inputMethod: PropTypes.oneOf(Object.values(INPUT_METHOD)).isRequired,
    onChangeInputMethod: PropTypes.func,
    // Rendering content
    children: PropTypes.node,
    renderInputMethodEditor: PropTypes.func.isRequired
  };
  static defaultProps = {
    children: null,
    onChangeInputMethod: () => {}
  };
  subscription: any;

  componentWillReceiveProps(nextProps: any) {
    const { onChangeInputMethod, keyboardVisible, inputMethod }: any =
      this.props;
    if (!keyboardVisible && nextProps.keyboardVisible) {
      // Keyboard shown
      onChangeInputMethod(INPUT_METHOD.KEYBOARD);
    } else if (
      // Keyboard hidden
      keyboardVisible &&
      !nextProps.keyboardVisible &&
      inputMethod !== INPUT_METHOD.CUSTOM
    ) {
      onChangeInputMethod(INPUT_METHOD.NONE);
    }
    const { keyboardAnimationDuration } = nextProps;
    const animation = LayoutAnimation.create(
      keyboardAnimationDuration,
      Platform.OS === "android"
        ? LayoutAnimation.Types.easeInEaseOut
        : LayoutAnimation.Types.keyboard,
      LayoutAnimation.Properties.opacity
    );
    LayoutAnimation.configureNext(animation);
    // ... more to come!
  }
  componentDidMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { onChangeInputMethod, inputMethod }: any = this.props;
        if (inputMethod === INPUT_METHOD.CUSTOM) {
          onChangeInputMethod(INPUT_METHOD.NONE);
          return true;
        }
        return false;
      }
    );
  }
  componentWillUnmount() {
    this.subscription.remove();
  }

  render() {
    const {
      children,
      renderInputMethodEditor,
      inputMethod,
      containerHeight,
      contentHeight,
      keyboardHeight,
      keyboardWillShow,
      keyboardWillHide
    }: any = this.props;
    // For our outer `View`, we want to choose between rendering at full
    // height (`containerHeight`) or only the height above the keyboard
    // (`contentHeight`). If the keyboard is currently appearing
    // (`keyboardWillShow` is `true`) or if it's fully visible
    // (`inputMethod === INPUT_METHOD.KEYBOARD`), we should use
    // `contentHeight`.
    const useContentHeight =
      keyboardWillShow || inputMethod === INPUT_METHOD.KEYBOARD;

    const containerStyle = {
      height: useContentHeight ? contentHeight : containerHeight
    };
    // We want to render our custom input when the user has pressed the camera
    // button (`inputMethod === INPUT_METHOD.CUSTOM`), so long as the keyboard
    // isn't currently appearing (which would mean the input field has received
    // focus, but we haven't updated the `inputMethod` yet).
    const showCustomInput =
      inputMethod === INPUT_METHOD.CUSTOM && !keyboardWillShow;
    // If `keyboardHeight` is `0`, this means a hardware keyboard is connected
    // to the device. We still want to show our custom image picker when a
    // hardware keyboard is connected, so let's set `keyboardHeight` to `250`
    // in this case.
    const inputStyle = {
      height: showCustomInput ? keyboardHeight || 250 : 0
    };
    return (
      <View style={containerStyle}>
        {children}
        <View style={inputStyle}>{renderInputMethodEditor()}</View>
      </View>
    );
  }
}
