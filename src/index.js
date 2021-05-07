import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/App";

import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "/src/styles/main.css";

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById("mountNode")
);
