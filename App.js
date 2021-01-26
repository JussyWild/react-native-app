import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, AcceptEnter, PasswordEnter } from './src/screens/Auth/Enter';
import { AppNavigation } from './src/navigation/AppNavigation';
import {
  AcceptRegistration,
  Nickname,
  PasswordRegistration,
  DateEnter,
} from './src/screens/Auth/Registration';
import { Recovery, AcceptRecovery } from './src/screens/Auth/Recovery';
import store from './src/redux/store';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
              headerShown: true,
              title: 'Войдите в ...',
            }}
          />
          <Stack.Screen
            name="Recovery"
            component={Recovery}
            options={{
              headerShown: true,
              title: 'Восстановление пароля',
            }}
          />
          <Stack.Screen
            name="AcceptRecovery"
            component={AcceptRecovery}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AcceptEnter"
            component={AcceptEnter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PasswordEnter"
            component={PasswordEnter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AcceptRegistration"
            component={AcceptRegistration}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DateEnter"
            component={DateEnter}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Nickname"
            component={Nickname}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="PasswordRegistration"
            component={PasswordRegistration}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={AppNavigation}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
