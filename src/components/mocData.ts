import { faker } from "@faker-js/faker";
import { Dimensions } from "react-native";
// import type { Contact, Location } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export const createContactListMockData = (count = 20): any[] => {
  return new Array(count).fill(0).map(() => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    address: `${faker.address.city()}, ${faker.address.country()}`,
    jobTitle: faker.name.jobTitle()
  }));
};

export const createContactSectionsMockData = (count = 20) => {
  return new Array(Math.round(count / 4)).fill(0).map(() => ({
    title: faker.address.country(),
    data: new Array(Math.round(count / 4)).fill(0).map(() => ({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      address: `${faker.address.city()}, ${faker.address.country()}`,
      jobTitle: faker.name.jobTitle()
    }))
  }));
};

export const createLocationListMockData = (count = 50): any[] => {
  return [
    {
      id: "ams",
      name: "Amsterdam",
      address: "North Holland, Netherlands",
      photos: [
        "https://www.infocusclinical.com/wp-content/uploads/2020/02/summer-amsterdam-FP.jpg",
        "https://images.theconversation.com/files/162459/original/image-20170325-12162-1tfrmbb.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=200&fit=clip",
        "https://www.kevinandamanda.com/wp-content/uploads/2014/09/amsterdam-2014-03.jpg",
        "https://specials-images.forbesimg.com/imageserve/5de4a1db755ebf0006fbea42/960x0.jpg?cropX1=0&cropX2=2121&cropY1=0&cropY2=1414"
      ]
    },
    ...new Array(count).fill(0).map((_, index) => ({
      id: faker.random.alphaNumeric(6),
      name: `${faker.address.city()}`,
      address: `${faker.address.state()}, ${faker.address.country()}`,
      photos: Array(5)
        .fill(0)
        .map((__, _index) => faker.image.city(SCREEN_WIDTH + index + _index))
    }))
  ];
};
