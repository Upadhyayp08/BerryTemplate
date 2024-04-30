import { combineReducers } from "redux";

// reducer import
import customizationReducer from "./customizationReducer";
import customerReducer from "./Customer/customerReducer";
import employeeReducer from "./Employee/employeeReducer";
import expenseReducer from "./Expense/expenseReducer";
import materialReducer from "./Material/materialReducer";
import purchaseReducer from "./Purchase/purchaseReducer";
import blogReducer from "./Blog/blogReducer";
import albumReducer from "./Album/albumReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customer: customerReducer,
  customization: customizationReducer,
  employee: employeeReducer,
  expense: expenseReducer,
  material: materialReducer,
  purchase: purchaseReducer,
  blog: blogReducer,
  album: albumReducer,
});

export default reducer;
