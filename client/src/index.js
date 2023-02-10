import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as redux from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';
import { createRoot } from 'react-dom/client';

import NavBar from './components/views/NavBar/NavBar';

// Redux를 연결해 주는 역할
const createStoreWithMiddleware = redux.applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
)(redux.createStore);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Provider
      // Redux를 연결해 주는 역할
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__(),
      )}
    >
      <NavBar />
      <App />
    </Provider>
  </BrowserRouter>,
);
