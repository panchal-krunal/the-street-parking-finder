import React from 'react';
import {LogBox, StatusBar} from 'react-native';
// import CodePush from 'react-native-code-push';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Colors from './helpers/colors';
import Navigation from './navigation';
import configureStore from './redux/store';

const {store, persistor} = configureStore();

LogBox.ignoreAllLogs();
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
// GLOBAL.FormData = GLOBAL.originalFormData || GLOBAL.FormData
if (__DEV__) {
  import('./helpers/tron').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            hidden={false}
            backgroundColor={Colors.white}
            barStyle="dark-content"
          />
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
// let codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME};

// export default CodePush(codePushOptions)(App);
