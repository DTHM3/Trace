import React, {useState} from 'react';

import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout } from '../../redux/workoutAction';

const ExerciseListItem = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();

    const workout = useSelector(state => state.workouts.workouts.find((w) =>  w.id === props.workoutId)).workout;
    const tempWorkout = {...workout};

    const tempExercise = {
        name: props.exerciseName,
        sets: 1,
        reps: 0,
        weight: 0,
        rpe: 0
    };

    const resetTempExercise = () => {
        tempExercise['name'] = "";
        tempExercise['sets'] = 1;
        tempExercise['reps'] = 0;
        tempExercise['weight'] = 0;
        tempExercise['rpe'] = 0;
    }

    const addExercise = () => {
        tempWorkout.exerciseNames = [...workout.exerciseNames, tempExercise['name']],
        tempWorkout.numSets = [...workout.numSets, tempExercise['sets']],
        tempWorkout.reps = [...workout.reps, Array(tempExercise['sets']).fill(tempExercise['reps'])],
        tempWorkout.weights = [...workout.weights, Array(tempExercise['sets']).fill(tempExercise['weight'])],
        tempWorkout.rpes = [...workout.rpes, Array(tempExercise['sets']).fill(tempExercise['rpe'])]
        dispatch(updateWorkout(props.workoutId, tempWorkout));
        resetTempExercise();
    }


    if (isExpanded) {
        return (
            
            <TouchableOpacity style={styles.touchableExpanded} onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.exerciseTitleExpanded}>{props.exerciseName}</Text>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <TextInput inputMode="numeric" placeholder="Sets" style={styles.sectionInput} onEndEditing={(val) => {tempExercise['sets'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                    <TextInput inputMode="numeric" placeholder="Reps"style={styles.sectionInput} onEndEditing={(val) => {tempExercise['reps'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                    
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <TextInput inputMode="numeric" placeholder="Weight" style={styles.sectionInput} onEndEditing={(val) => {tempExercise['weight'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                    <TextInput inputMode="numeric" placeholder="RPE" style={styles.sectionInput} onEndEditing={(val) => {tempExercise['rpe'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                </View>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <TouchableOpacity style={styles.button} onPress={() => {addExercise(); props.toggleModal()}}><Text>Add</Text></TouchableOpacity>
                </View>
                
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity style={styles.touchable} onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.exerciseTitle} >{props.exerciseName}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    exerciseTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
    exerciseTitleExpanded: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 25,
        marginBottom: 5,
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
    },
    touchable: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "stretch",
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        padding: '7%'
    },
    touchableExpanded: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "stretch",
        height: 'auto',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        margin: 5,
        borderRadius: 10
    },
    sectionInput: {
        flex: 1,
        textAlign: 'center',
        fontSize: 25,
        margin: 10,
        backgroundColor: '#c9c9c7',
        fontSize: 25,
        borderRadius: 10,
        padding: 5,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        borderWidth: 2,
        marginHorizontal: 10,
        shadowColor: '#000',
          shadowOffset: {
              width: 0,
              height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          margin: 10,
          marginHorizontal: 40,
          borderRadius: 10,
          padding: '2%'
    },
})

export default ExerciseListItem;