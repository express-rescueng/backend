import React, { useState } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import Dashboard from './screens/Dashboard';
import SearchScreen from './screens/searchUser';
import MyComponent from './screens/searchUser';
import IntroScreen from './screens/introScreen';


const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const toggleLoading = (status) => {
    setLoading(status);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#A94400"
            }
          }}
        >
          <Stack.Screen
            name='intro'
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Register' }}

          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}

          />
          {/* <Stack.Screen
            name="Dashboard"
            component={HomeScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ title: 'Dashboard' }}

          />
          <Stack.Screen
            name="components"
            component={MyComponent}
            options={{ title: 'My comp' }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}

            options={{
              title: 'Home Screen',
              headerLeft: null,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// Path: ExRescue\screens\registerScreen.js