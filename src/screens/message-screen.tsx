import React, { useEffect, useState } from "react";
import {
  View,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Image
} from "react-native";
import Status from "../components/status";
import { MessageList } from "../components/message-list";
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage
} from "../utils";
import { Toolbar } from "../components";
import { ImageGrid } from "../components/image-grid";
import KeyboardState from "../components/keyboard-state";
import MeasureLayout from "../components/measure-layout";
import MessagingContainer, {
  INPUT_METHOD
} from "../components/messaging-container";
import { InferProps, Validator } from "prop-types";

export function MessageScreen() {
  const [message, setMessage] = useState<any>({});
  const [isInputFocused, setInputFocused] = useState(false);
  const [inputMethod, setInputMethod] = useState(INPUT_METHOD);

  useEffect(() => {
    setInputMethod(INPUT_METHOD);
    setMessage({
      messages: [
        createImageMessage("https://unsplash.it/300/300"),
        createTextMessage("Prakash"),
        createTextMessage("Pun"),
        createLocationMessage({
          latitude: 37.78825,
          longitude: -122.4324
        })
      ],
      fullscreenImageId: null
    });
  }, []);

  const handlePressToolbarCamera = () => {};
  const handlePressToolbarLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { latitude, longitude }
      } = position;
      // setMessage({
      //   messages: [createLocationMessage({ latitude, longitude })],
      //   ...message
      // });
    });
  };

  const handleChangeFocus = (isFocused: boolean) => {
    setInputFocused(isFocused);
  };

  const handleChangeInputMethod = (inputMethod: any) => {
    setInputMethod(inputMethod);
  };

  const handleSubmit = (text: string) => {
    setMessage({ messages: [createTextMessage(text)], ...message });
  };

  const dismissFullScreenImage = () => {
    setMessage({ ...message, fullscreenImageId: null });
  };

  const handlePressMessage = ({ id, type }: any): void => {
    switch (type) {
      case "text":
        Alert.alert(
          "Delete message?",
          "Are you sure you want to permanently delete this message?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                console.log("you clicked delete");
              }
            }
          ]
        );
        break;
      case "image":
        setMessage({ ...message, fullscreenImageId: id });
        setInputFocused(false);
      default:
        break;
    }
  };
  const renderMessageList = () => {
    return (
      <View style={styles.content}>
        <MessageList message={message} onPressMessage={handlePressMessage} />
      </View>
    );
  };
  const renderInputMethodEditor = () => {
    return <View style={styles.inputMethodEditor}></View>;
  };
  const renderToolBar = () => {
    return (
      <View style={styles.toolbar}>
        <Toolbar
          isFocused={isInputFocused}
          onSubmit={handleSubmit}
          onChangeFocus={handleChangeFocus}
          onPressCamera={handlePressToolbarCamera}
          onPressLocation={handlePressToolbarLocation}
        />
      </View>
    );
  };

  const renderFullScreenImage = () => {
    if (!message.fullscreenImageId) return null;

    const image = message.messages[0];
    const { uri } = image;
    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={dismissFullScreenImage}
      >
        <Image style={styles.fullScreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };
  return (
    <View style={styles.container}>
      <Status />
      <MeasureLayout>
        {(layout: any) => (
          <KeyboardState layout={layout}>
            {(keyboardInfo: any) => (
              <MessagingContainer
                {...keyboardInfo}
                inputMethod={inputMethod}
                onChangeInputMethod={handleChangeInputMethod}
                renderInputMethodEditor={renderInputMethodEditor}
              >
                {renderMessageList()}
                {renderToolBar()}
              </MessagingContainer>
            )}
          </KeyboardState>
        )}
      </MeasureLayout>
      {renderFullScreenImage()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  content: { flex: 1, backgroundColor: "white" },
  inputMethodEditor: { flex: 1, backgroundColor: "white" },
  toolbar: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white"
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 2
  },
  fullScreenImage: {
    flex: 1,
    resizeMode: "contain"
  }
});
