import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import App from "./App.js";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/scss/style.scss';
import { ConfirmProvider } from "material-ui-confirm";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <ConfirmProvider>
        <Provider store={store}>
        <ToastContainer />
          <App />
        </Provider>
        </ConfirmProvider>
      </BrowserRouter>
    </ThemeProvider>
);

reportWebVitals();

