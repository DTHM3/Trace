import * as React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import WorkoutStack from './components/workoutStack';
import Home from './components/home';

import store from './redux/store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Tab.Navigator >
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
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
    
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
  },
});