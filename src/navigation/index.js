import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import React from 'react';
import {
  Action,
  Home,
  Language,
  Map,
  Profile,
  Pullout,
  Signup,
  Splash,
  VehicleInfo,
  VerifyOTP,
} from '../screens';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          headerStyleInterpolator: HeaderStyleInterpolators.forNoAnimation,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="VehicleInfo" component={VehicleInfo} />
        <Stack.Screen name="Action" component={Action} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Pullout" component={Pullout} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
