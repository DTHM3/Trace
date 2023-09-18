import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Title from './exerciseComponents/title';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout, } from '../redux/workoutAction';
import Entypo from 'react-native-vector-icons/Entypo'
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";

const Exercise = (props) => {
    const workoutId = parseInt(props.id.slice(0, props.id.search("_")));
    const exerciseId = parseInt(props.id.slice(props.id.search("_") + 1));
    const workout = useSelector(state => state.workouts.workouts.find((w) =>  w.id === workoutId)).workout;
    const dispatch = useDispatch();

    const tempWorkout = {...workout};

    const [setNum, setSetNum] = useState(1);
    const numSets = workout.numSets[exerciseId];

    const [isActive, setIsActive] = React.useState(false);

    const addSet = () => {
        tempWorkout['numSets'] = [...workout.numSets.slice(0, exerciseId), tempWorkout.numSets[exerciseId] + 1, ...workout.numSets.slice(exerciseId+1)];
        tempWorkout.reps = [...workout.reps.slice(0, exerciseId), 
            [...workout.reps[exerciseId], tempWorkout.reps[exerciseId][setNum - 1]], 
            ...workout.reps.slice(exerciseId + 1)];
        tempWorkout.weights = [...workout.weights.slice(0, exerciseId), 
            [...workout.weights[exerciseId], tempWorkout.weights[exerciseId][setNum - 1]], 
            ...workout.weights.slice(exerciseId + 1)];
        tempWorkout.rpes = [...workout.rpes.slice(0, exerciseId), 
            [...workout.rpes[exerciseId], tempWorkout.rpes[exerciseId][setNum - 1]], 
            ...workout.rpes.slice(exerciseId + 1)];
        dispatch(updateWorkout(workoutId, tempWorkout));
        setSetNum(numSets + 1);
    }

    const removeSet = () => {
        if (numSets === 1) return;
        tempWorkout['numSets'] = [...workout.numSets.slice(0, exerciseId), tempWorkout.numSets[exerciseId] - 1, ...workout.numSets.slice(exerciseId + 1)];
        tempWorkout.reps = [...workout.reps.slice(0, exerciseId), 
            [...workout.reps[exerciseId].slice(0, setNum - 1), ...workout.reps[exerciseId].slice(setNum)], 
            ...workout.reps.slice(exerciseId + 1)];
        tempWorkout.weights = [...workout.weights.slice(0, exerciseId), 
            [...workout.weights[exerciseId].slice(0, setNum - 1), ...workout.weights[exerciseId].slice(setNum)], 
            ...workout.weights.slice(exerciseId + 1)];
        tempWorkout.rpes = [...workout.rpes.slice(0, exerciseId), 
            [...workout.rpes[exerciseId].slice(0, setNum - 1), ...workout.rpes[exerciseId].slice(setNum)], 
            ...workout.rpes.slice(exerciseId + 1)];
        if (setNum == numSets) setSetNum(setNum - 1);
        
        dispatch(updateWorkout(workoutId, tempWorkout));
    }

    const removeExercise = () => {
        tempWorkout['exerciseNames'] = [...workout['exerciseNames'].slice(0, exerciseId), ...workout['exerciseNames'].slice(exerciseId + 1)];
        tempWorkout['numSets'] = [...workout['numSets'].slice(0, exerciseId), ...workout['numSets'].slice(exerciseId + 1)];

        tempWorkout['reps'] = [...workout['reps'].slice(0, exerciseId), ...workout['reps'].slice(exerciseId + 1)];

        tempWorkout['weights'] = [...workout['weights'].slice(0, exerciseId), ...workout['weights'].slice(exerciseId + 1)];

        tempWorkout['rpes'] = [...workout['rpes'].slice(0, exerciseId), ...workout['rpes'].slice(exerciseId + 1)];

        dispatch(updateWorkout(workoutId, tempWorkout));
    }

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
            <TouchableOpacity style={styles.containerActive} onPress={toggleActive}>
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

                <View style={styles.setContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {if(setNum > 1) setSetNum(setNum - 1)}} >
                        <Entypo name="arrow-with-circle-left" size={40} color={'#D9D9D4'}/>
                    </TouchableOpacity>

                    <View style={styles.button}>
                        <Text style={styles.setTitle}>Set</Text>
                        <Text style={styles.set}>{setNum}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => {if(setNum < numSets) setSetNum(setNum + 1)}} >
                        <Entypo name="arrow-with-circle-right" size={40} color={'#D9D9D4'}/>
                    </TouchableOpacity>
                </View>
                <Menu>
                    <MenuTrigger>
                        <Entypo name="dots-three-horizontal" size={40} color={'#D9D9D4'}/>
                    </MenuTrigger>
                    <MenuOptions optionsContainerStyle={{borderRadius: 10, shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,}} customStyles={{optionText: {fontSize: 15, fontWeight: 500}}} >
                        <MenuOption onSelect={() => addSet()} text="Add Set" customStyles={{optionWrapper: {borderRadius: 10}}} />
                        <MenuOption onSelect={() => removeSet()} text="Delete Set" />
                        <MenuOption onSelect={() => Alert.alert("Delete this Exercise?", undefined, [{text: "Cancel", style: 'cancel'}, {text: "Delete", onPress: removeExercise}], {cancelable: true})}>
                            <Text style={{color: 'red', fontSize: 15, fontWeight: 500}}>Delete Exercise</Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
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
        backgroundColor: '#363630',
    },
    set: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        color: '#D9D9D4'
    },
    setTitle: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        color: '#D9D9D4'
    },
    setContainer: {
        flexDirection: 'row',
        height: 'auto'
    },
    containerActive: {
        backgroundColor: '#363630',
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
        backgroundColor: '#363630',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 2,
        borderColor: '#000',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },
    containerInactive: {
        backgroundColor: '#363630',
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
        color: '#D9D9D4'
    },
    row: {
        flexDirection: 'row',
        textAlign: 'center'
    },
    section: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 10,
        color: '#D9D9D4'
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover'
    },
    delete: {
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
        borderRadius: 10,
        padding: '2%',
        backgroundColor: '#d11a2a',
        borderColor: '#d11a2a'
    },
});

export default Exercise;