import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Score from './src/pages/score/Score';
import {store} from './src/shared/store';
import {persistStore} from 'redux-persist';

const persistor = persistStore(store);
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" />
          <Score />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
