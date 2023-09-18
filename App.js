
import * as React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuProvider } from 'react-native-popup-menu';

import WorkoutStack from './components/workoutStack';
import Home from './components/home';
import LoginView from './components/loginView';

import store from './redux/store';
import { Provider } from 'react-redux';


/* import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession(); */

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <Tab.Navigator screenOptions={{
                tabBarInactiveTintColor: '#B9B1D2', tabBarActiveTintColor: '#7464A6', tabBarStyle: { backgroundColor: '#0B0B0A', }, headerStyle: { backgroundColor: '#0B0B0A' }, headerTintColor: '#B9B1D2',
              }} >
              <Tab.Screen name="Home" component={Home} options={{
                headerTitleAlign: 'center',
                headerShown: true,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="home" color={color} size={size} />
                )
              }} />
              <Tab.Screen name="Lift" options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="weight-lifter" color={color} size={size} />
                )
                }}>
                {(props) => <WorkoutStack {...props} />}
              </Tab.Screen>
              <Tab.Screen name="Login">
                {(props) => <LoginView {...props} />}
              </Tab.Screen>
            </Tab.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#151513',
  },
});