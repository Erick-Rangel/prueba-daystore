import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider} from "react-redux";
import store from "./store/store";
import { Home } from "./components/Home"


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Home/>
      </BrowserRouter>
    </Provider>
  );
};
