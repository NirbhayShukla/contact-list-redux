import { getDefaultNormalizer } from "@testing-library/react";

const initialState = [
  {
    id: 0,
    name: "Nirbhay Shukla",
    number: "9161733130",
    email: " nirbhay.shukla.111@gmail.com",
  },
  {
    id: 1,
    name: "Vidhi Shukla",
    number: "9161733330",
    email: "nirbhay.shukla.111@gmail.com",
  },
];

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CONTACT":
      const newState = [...state, action.payload];
      return newState;
    case "EDIT_CONTACT":
      return state.map((item) => {
        if (item.id !== action.payload.id) return item;
        else return action.payload;
      });
    case "DELETE_CONTACT":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export default contactReducer;
