import axios from "axios";
import PropTypes from "prop-types";

export const getImage = (weather: string) => {
  if (weather === "Clear") {
    return require("../assets/clear.webp");
  } else if (weather === "Showers") {
    return require("../assets/shower.jpg");
  } else if (weather === "Heavy Cloud") {
    return require("../assets/heavy-cloud.jpg");
  }
};

export const MessageShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["text", "image", "location"]),
  text: PropTypes.string,
  uri: PropTypes.string,
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
});

let messageId = 0;

function getNextId() {
  messageId += 1;
  return messageId;
}

export function createTextMessage(text: string) {
  return {
    type: "text",
    id: getNextId(),
    text
  };
}

export function createImageMessage(uri: string) {
  return {
    type: "image",
    id: getNextId(),
    uri
  };
}

export function createLocationMessage(coordinate: {
  latitude: number;
  longitude: number;
}) {
  return {
    type: "location",
    id: getNextId(),
    coordinate
  };
}

export const getUserDetail = (contactList: any[], phone: string) => {
  const data = contactList.find((contact: any) => {
    console.log(contact.phone, phone);
    return contact.phone === phone;
  });
};
