import { StyleSheet, ScrollView, Text, Modal, View, Button, TextInput, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
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
                {(props) => <Workout {...props} workoutName={JSON.stringify(props.route.params['workoutName'])} exerciseNames={props.route.params['exerciseNames']} numSets={props.route.params['numSets']} reps={props.route.params['reps']} weights={props.route.params['weights']} rpes={props.route.params['rpes']} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

export default WorkoutStack;