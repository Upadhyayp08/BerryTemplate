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
import saleReducer from "./Sale/saleReducer";
import itemReducer from "./Item/itemReducer";
import stockReducer from "./Stock/stockReducer";

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
  sale: saleReducer,
  item: itemReducer,
  stock: stockReducer,
});

export default reducer;
