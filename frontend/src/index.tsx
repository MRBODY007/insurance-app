import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; //  Import Redux Provider
import store from './redux/store'; //  Import Store
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Provider store={store}> {/*  ต้องครอบ App ด้วย Provider */}
      <App />
    </Provider>
  // </React.StrictMode>
);

reportWebVitals();
