import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BKSReducer from "./reducers/BKSReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import BKSContainer from "./Containers/BKSContainer";

const store = createStore(BKSReducer);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BKSContainer />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
