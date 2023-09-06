import React, { useState } from "react";
import { TouchableOpacity, Text, View, Alert, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import {addExercise} from '../../redux/exerciseAction';
import { SafeAreaView } from "react-native-safe-area-context";

const createExerciseButton = () => {
    const [createExerciseIsActive, setCreateExerciseIsActive] = useState(false);
    const dispatch = useDispatch();


    let tempExerciseName = "";

    const handleAddExercise = (exercise) => {
        dispatch(addExercise(exercise));
    }
    
    if (createExerciseIsActive) {
        return (
            <SafeAreaView style={styles.touchableExpanded}>
                <TouchableOpacity style={styles.title} onPress={() => {setCreateExerciseIsActive(!createExerciseIsActive)}}>
                    <Text style={styles.exerciseTitleExpanded}>
                        Create Exercise
                    </Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <TextInput style={styles.sectionInput} placeholder='Exercise Name' returnKeyType='done' onEndEditing={(val) => {tempExerciseName = val["nativeEvent"]["text"].trim();}} />
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        if (tempExerciseName) {
                            handleAddExercise(tempExerciseName);
                            setCreateExerciseIsActive(false);
                        } else {
                            Alert.alert("New exercise needs a name")
                        }
                        }} title='Add' >
                        <Text>Add</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )

    } else {
        return (
            <View>
                <TouchableOpacity style={styles.touchable} onPress={() => {setCreateExerciseIsActive(!createExerciseIsActive)}}>
                    <Text style={styles.exerciseTitle}>
                        Create Exercise
                    </Text>
                </TouchableOpacity>
            </View>
        );
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
    row: {
        flexDirection: 'row',
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
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 10,
        backgroundColor: '#c9c9c7',
        flex: 1,
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 10,
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

export default createExerciseButton;