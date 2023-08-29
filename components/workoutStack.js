import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutMenu from './workoutMenu';
import Workout from './workout';

const Stack = createNativeStackNavigator();

const WorkoutStack = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Workout Menu" >
                {(props) => <WorkoutMenu {...props} />}
            </Stack.Screen>
            <Stack.Screen name="Workout">
                {(props) => <Workout {...props} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default WorkoutStack;