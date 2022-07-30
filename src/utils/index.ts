import moment from "moment";
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
    return contact.phone === phone;
  });
};

export const getDateRange = (startDate: string, endDate: string): string[] => {
  const start = moment(startDate, "YYYY-MM-DD", true);
  const end = moment(endDate, "YYYY-MM-DD", true);

  const dateRange: string[] = [];
  if (start.isValid() && end.isValid()) {
    const now = start.clone();
    while (now.isSameOrBefore(end)) {
      dateRange.push(now.format("YYYY-MM-DD"));
      now.add(1, "day");
    }
  } else {
    dateRange.push(startDate);
  }

  const round = startDate && endDate ? true : false;

  let markedDateObject: any = {};
  dateRange.forEach(date => {
    if (date === startDate) {
      markedDateObject[date] = {
        startingDay: true,
        color: "#2b2c2e",
        textColor: "white",
        endingDay: round ? false : true
      };
    } else if (date === endDate) {
      markedDateObject[date] = {
        endingDay: true,
        color: "#2b2c2e",
        textColor: "white"
      };
    } else {
      markedDateObject[date] = {
        color: "#b8babf",
        textColor: "white"
      };
    }
  });

  return markedDateObject;
};

export const data = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    name: "First Item"
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    name: "Second Item"
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    name: "Third Item"
  }
];

// markedDates={{
//   "2022-07-04": {
//     disabled: true,
//     startingDay: true,
//     color: "green",
//     endingDay: true
//   }
// }}
