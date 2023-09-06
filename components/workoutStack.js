import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';


import { useSelector } from 'react-redux';


import WorkoutMenu from './workoutMenu';
import Workout from './workout';

const Stack = createNativeStackNavigator();

const WorkoutStack = (props) => {
    const workouts = useSelector(state => state.workouts.workouts);

    const getWorkoutName = () => {
        if (props.route.params) {
            id = props.route.params.id;
            workoutName = workouts.find((w) =>  w.id === id).workout.name;
            return workoutName;
        } else return "Workout";
    }
    return (
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen name="Workouts" >
                {(props) => <WorkoutMenu {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Workout" component={Workout} options={{ title: getWorkoutName() }} />
        </Stack.Navigator>
    );
}

export default WorkoutStack;