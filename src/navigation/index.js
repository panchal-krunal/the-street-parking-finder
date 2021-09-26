import {NavigationContainer} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';

import {createDrawerNavigator} from '@react-navigation/drawer';

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
  Subscription,
  Payment,
  Plan,
  Thankyou,
  Share,
  Support,
  Disclaimer,
  Terms,
  EditProfile,
  EditVehicleInfo,
  MyPlans,
} from '../screens';

import SideDrawer from './Drawer';

const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerComponent = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Pullout'}
      drawerPosition="left"
      drawerType="front"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <SideDrawer {...props} />}>
      <Drawer.Screen name="Pullout" component={Pullout} />
      <Drawer.Screen name="Share" component={Share} />
      <Drawer.Screen name="Support" component={Support} />
      <Drawer.Screen name="Disclaimer" component={Disclaimer} />
      <Drawer.Screen name="Terms" component={Terms} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
      <Drawer.Screen name="EditVehicleInfo" component={EditVehicleInfo} />
      <Drawer.Screen name="MyPlans" component={MyPlans} />
    </Drawer.Navigator>
  );
};

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

        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Plan" component={Plan} />
        <Stack.Screen name="Thankyou" component={Thankyou} />
        <Stack.Screen name="Drawer" component={DrawerComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
