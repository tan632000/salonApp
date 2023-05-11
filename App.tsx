/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import DrawerNavigator from './navigation/DrawerNavigator';
import SignInWelcome from './screens/auth/SignInWelcomeScreen';
import SignIn from './screens/auth/SignInScreen';
import SignUp from './screens/auth/SignUpScreen';
import CutHistory from './screens/CutHistoryScreen';
import SalonSysttom from './screens/SalonSysttomScreen';
import SalonDetail from './screens/SalonDetailScreen';
import BookingSalon from './screens/BookingSalonScreen';
import store from './redux/store';
import { navigationRef } from './navigation/NavigationService';
import { selectUserToken } from './redux/features/userSlice';
import ExperienceService from './screens/ExperienceServiceScreen';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamList } from './Types';

const Stack = createStackNavigator<RootStackParamList>();
const persistor = persistStore(store);

function App() {
  const userToken = useSelector(selectUserToken);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="SignInWelcome">
        {!userToken ? (
          <>
            <Stack.Screen name="SignInWelcome" component={SignInWelcome} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExperienceService"
              component={ExperienceService}
              options={{ gestureEnabled: false, headerShown: false }}
            />

            <Stack.Screen
              name="CutHistory"
              component={CutHistory}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SalonSysttom"
              component={SalonSysttom}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SalonDetail"
              component={SalonDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BookingSalon"
              component={BookingSalon}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function Root() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
