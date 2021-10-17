import React from 'react';
import Main from './src/components/MainComponent'
import { store } from './src/redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />  
      </PersistGate>
    </Provider>
  );
}

export default App;