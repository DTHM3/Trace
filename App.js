import * as React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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
            <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Tab.Screen name="Workout Stack" options={{headerShown: false}}>
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