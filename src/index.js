import React from "react";
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from './commons/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
