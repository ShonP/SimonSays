import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {createStackNavigator} from '@react-navigation/stack';
import {ThemeProvider} from 'styled-components';
import {RootStackParamList} from './src/shared/types';
import ResultScreen from './src/screens/resultScreen/ResultScreen';
import store from './src/shared/store';
import theme from './src/shared/theme/theme';
import Game from './src/screens/game/Game';

const persistor = persistStore(store);

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <StatusBar barStyle="dark-content" />
            <Stack.Navigator>
              <Stack.Screen name="Result" component={ResultScreen} />
              <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
