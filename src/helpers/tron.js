import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    host: '192.168.1.105',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect(); // let's connect!

export default Reactotron;

export const log = (msg, ...args) => Reactotron.log(msg, args);
