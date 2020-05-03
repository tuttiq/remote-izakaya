import React from 'react';
import ReactDOM from 'react-dom';
import { fbconfig } from './config/firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { Provider } from 'react-redux';
import createStore from './createStore'
import App from './views/app/App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './services/serviceWorker';

// const firebaseConfig = {}; // from Firebase Console
// optional redux-firestore Config Options
const rfConfig = {
  userProfile: 'users', // root that user profiles are written to
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true // Metadata associated with storage file uploads goes to Firestore
}

firebase.initializeApp(fbconfig)

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
