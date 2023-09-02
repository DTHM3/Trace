import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Title from './exerciseComponents/title';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout, } from '../redux/workoutAction';

const Exercise = (props) => {
    const workoutId = parseInt(props.id.slice(0, props.id.search("_")));
    const exerciseId = parseInt(props.id.slice(props.id.search("_") + 1));
    const workout = useSelector(state => state.workouts.workouts.find((w) =>  w.id === workoutId)).workout;
    const dispatch = useDispatch();

    const tempWorkout = {...workout};

    const [setNum, setSetNum] = useState(1);
    const numSets = workout.numSets[exerciseId];

    const [isActive, setIsActive] = React.useState(false);

    const changeReps = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            const newReps = parseInt(newVal["nativeEvent"]["text"].trim());
            tempWorkout.reps = [...workout.reps.slice(0, exerciseId), 
                [...workout.reps[exerciseId].slice(0, setNum - 1), newReps, ...workout.reps[exerciseId].slice(setNum)], 
                ...workout.reps.slice(exerciseId + 1)];
        }
        dispatch(updateWorkout(workoutId, tempWorkout));
    }
    const changeWeight = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            const newWeight = parseInt(newVal["nativeEvent"]["text"].trim());
            tempWorkout.weights = [...workout.weights.slice(0, exerciseId), 
                [...workout.weights[exerciseId].slice(0, setNum - 1), newWeight, ...workout.weights[exerciseId].slice(setNum)], 
                ...workout.weights.slice(exerciseId + 1)];
        }
        dispatch(updateWorkout(workoutId, tempWorkout));
    }
    const changeRpe = (newVal) => {
        if (newVal["nativeEvent"]["text"].trim()) {
            if (Number(newVal["nativeEvent"]["text"].trim()) <= 10) {
                const newRpe = parseInt(newVal["nativeEvent"]["text"].trim());
                tempWorkout.rpes = [...workout.rpes.slice(0, exerciseId), 
                    [...workout.rpes[exerciseId].slice(0, setNum - 1), newRpe, ...workout.rpes[exerciseId].slice(setNum)], 
                    ...workout.rpes.slice(exerciseId + 1)];
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
            <TouchableOpacity onPress={toggleActive} style={styles.containerActive}>
                <View style={styles.touchable}>
                    <Title exerciseName={workout.exerciseNames[exerciseId]} exerciseNum={exerciseId + 1} />
                </View>
                    
                
                <View style={styles.row}>
                    
                    
                    {/* Reps */}
                    <View style={styles.container}>
                        <Text style={styles.section}>Reps</Text>
                        <TextInput style={styles.sectionInput} placeholder={workout.reps[exerciseId][setNum - 1].toString()} defaultValue={workout.reps[exerciseId][setNum - 1].toString()} inputMode='numeric' keyboardType='numeric' returnKeyType='done' maxLength={5} onEndEditing={text => changeReps(text)} />
                    </View>
    
                    {/* Weight */}
                    <View style={styles.container}>
                        <Text style={styles.section}>Weight</Text>
                        <TextInput style={styles.sectionInput} placeholder={workout.weights[exerciseId][setNum - 1].toString()} defaultValue={workout.weights[exerciseId][setNum - 1].toString()} inputMode='numeric' keyboardType='numeric' returnKeyType='done' maxLength={5} onEndEditing={text => changeWeight(text)} />
                    </View>
                    
                    {/* RPE */}
                    <View style={styles.container}>
                        <Text style={styles.section}>RPE</Text>
                        <TextInput style={styles.sectionInput} placeholder={workout.rpes[exerciseId][setNum - 1].toString()} defaultValue={workout.rpes[exerciseId][setNum - 1].toString()} keyboardType='numeric' inputMode='numeric' returnKeyType='done' maxLength={2} onEndEditing={text => changeRpe(text)} />
                    </View>
    
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {if(setNum > 1) setSetNum(setNum - 1)}} >
                        <Image style={styles.button} source={require('../assets/left-arrow.png')} />
                    </TouchableOpacity>

                    <View>
                        <Text style={styles.setTitle}>Set</Text>
                        <Text style={styles.set}>{setNum}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {if(setNum < numSets) setSetNum(setNum + 1)}} >
                        <Image style={styles.button} source={require('../assets/right-arrow.png')} />
                    </TouchableOpacity>
                </View>
    
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity onPress={toggleActive} style={styles.containerInactive}>
                <Title exerciseName={workout.exerciseNames[exerciseId]} exerciseNum={exerciseId + 1} />
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
    set: {
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'center',
        fontWeight: '700',
    },
    setTitle: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center',
    },
    containerActive: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
    touchable: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#ebebeb',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    containerInactive: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "stretch",
        height: 75,
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
        backgroundColor: '#ebebeb',
        flex: 1,
        borderRadius: 10,
        padding: 5,
        alignSelf: 'stretch',
        marginHorizontal: 5,
        marginBottom: 10
    },
    button: {
        width: 64,
        height: 64,
    },
    
});

export default Exercise;