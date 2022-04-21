import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import Ciudades from "./slices/Ciudades";
import Filters from "./slices/Filters";

export default configureStore({
  reducer: {
    Ciudades,
    Filters,
  },
  middleware: [thunk],
  
});

