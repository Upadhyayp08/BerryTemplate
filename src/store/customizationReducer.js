// project imports
import config from "config";

// action - state management
import * as actionTypes from "./actions";

const getInitialMenu = () => {
  const savedMenu = localStorage.getItem("isOpenMenu");
  return savedMenu ? [savedMenu] : ["dashboard"];
};

export const initialState = {
  isOpen: getInitialMenu(), // for active default menu
  defaultId: "default",
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true,
};

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

const customizationReducer = (state = initialState, action) => {
  let id;
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      id = action.id;
      console.log(id);
      return {
        ...state,
        isOpen: [id],
      };
    case actionTypes.SET_MENU:
      return {
        ...state,
        opened: action.opened,
      };
    case actionTypes.SET_FONT_FAMILY:
      return {
        ...state,
        fontFamily: action.fontFamily,
      };
    case actionTypes.SET_BORDER_RADIUS:
      return {
        ...state,
        borderRadius: action.borderRadius,
      };
    case actionTypes.RESET_STATE:
      return {
        ...initialState,
        isOpen: ["dashboard"], // Explicitly set to default page
      };
    default:
      return state;
  }
};

export default customizationReducer;
