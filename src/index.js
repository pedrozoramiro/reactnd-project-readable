import React from "react";
import { Provider } from 'react-redux'
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from './commons/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
