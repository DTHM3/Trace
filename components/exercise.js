import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Title from './exerciseComponents/title';
import Set from './exerciseComponents/set';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout, } from '../redux/workoutAction';

const Exercise = (props) => {
    const workoutId = parseInt(props.id.slice(0, props.id.search("_")));
    const exerciseId = parseInt(props.id.slice(props.id.search("_") + 1));
    const workout = useSelector(state => state.workouts.find((w) =>  w.id === workoutId)).workout;

    const [setNum, setSetNum] = React.useState(1);
    const [isActive, setIsActive] = React.useState(false);

    const [numSets, setNumSets] = React.useState(props.numSets);
    const [reps, setReps] = React.useState(props.reps);
    const [weights, setWeights] = React.useState(props.weights);
    const [rpes, setRpes] = React.useState(props.rpes);

    const nextSet = () => {
        if (setNum < numSets) {
            setSetNum(setNum + 1);
        }
    }
    const prevSet = () => {
        if (setNum > 1) {
            setSetNum(setNum - 1);
        }
    }
    const changeReps = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            let repsCopy = reps;
            repsCopy[setNum - 1] = newVal["nativeEvent"]["text"];
            setReps(repsCopy);
            workout.reps[exerciseId][setNum - 1] = repsCopy;
            useDispatch(updateWorkout(workout));
        }

    }
    const changeWeight = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            let weightsCopy = weights;
            weightsCopy[setNum - 1] = newVal["nativeEvent"]["text"];
            setWeights(weightsCopy);
            workout.weights[exerciseId][setNum - 1] = weightsCopy;
            useDispatch(updateWorkout(workout));
        }
    }
    const changeRpe = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            if (Number(newVal["nativeEvent"]["text"].trim()) <= 10) {
                let rpesCopy = rpes;
                rpesCopy[setNum - 1] = newVal["nativeEvent"]["text"];
                setRpes(rpesCopy);
                workout.rpes[exerciseId][setNum - 1] = rpesCopy;
                useDispatch(updateWorkout(workout));
            }
            else {
                Alert.alert('Invalid RPE', 'RPE must be a number below 10', {text: 'OK'});
            }
        }
    }
    const toggleActive = () => {
        if (isActive) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    }

    if (isActive) {
        return (
            <View style={styles.containerActive}>
                <TouchableOpacity onPress={toggleActive} style={styles.touchable}>
                    <Title exerciseName={props.exerciseName} exerciseNum={props.exerciseNum} />
                </TouchableOpacity>
                    
                
                <View style={styles.row}>
                    <View style={styles.container}>
                        <Set value={setNum} numSets={10} />
                    </View> 
                    
                    {/* Reps */}
                    <View style={styles.container}>
                        <Text style={styles.section}>Reps</Text>
                        <TextInput style={styles.sectionInput} placeholder={reps[setNum - 1].toString()} defaultValue={reps[setNum - 1].toString()} inputMode='numeric' keyboardType='numeric' returnKeyType='done' maxLength={3} onEndEditing={text => changeReps(text)} />
                    </View>
    
                    {/* Weight */}
                    <View style={styles.container}>
                        <Text style={styles.section}>Weight</Text>
                        <TextInput style={styles.sectionInput} placeholder={weights[setNum - 1].toString()} defaultValue={weights[setNum - 1].toString()} inputMode='numeric' keyboardType='numeric' returnKeyType='done' maxLength={4} onEndEditing={text => changeWeight(text)} />
                    </View>
                    
                    {/* RPE */}
                    <View style={styles.container}>
                        <Text style={styles.section}>RPE</Text>
                        <TextInput style={styles.sectionInput} placeholder={rpes[setNum - 1].toString()} defaultValue={rpes[setNum - 1].toString()} keyboardType='numeric' inputMode='numeric' returnKeyType='done' maxLength={4} onEndEditing={text => changeRpe(text)} />
                    </View>
    
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={prevSet} >
                        <Image style={styles.button} source={require('../assets/left-arrow.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={nextSet} >
                        <Image style={styles.button} source={require('../assets/right-arrow.png')} />
                    </TouchableOpacity>
                </View>
    
            </View>
        );
    } else {
        return (
            <TouchableOpacity onPress={toggleActive} style={styles.containerInactive}>
                <Title exerciseName={props.exerciseName} exerciseNum={props.exerciseNum} style={styles.title} />
            </TouchableOpacity>
        );
        
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerActive: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 6,
    },
    touchable: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 6,
    },
    containerInactive: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 3,
    },
    title: {
        backgroundColor: '#c9c9c7',
    },
    row: {
        flexDirection: 'row',
    },
    section: {
        fontSize: 25,
        fontWeight: '400',
        textAlign: 'center',
        marginVertical: 10,
    },
    sectionInput: {
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 10,
        backgroundColor: '#c9c9c7',
        width: 70,
        borderRadius: 10,
        padding: 5,
    },
    button: {
        width: 64,
        height: 64,
    },
    
});

export default Exercise;