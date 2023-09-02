import { StyleSheet, ScrollView, Text, Modal, View, Button, TextInput, TouchableOpacity, Pressable} from 'react-native';
import React, {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addWorkout } from '../redux/workoutAction';
import store from '../redux/store';


const WorkoutMenu = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    const workouts = useSelector(state => state.workouts.workouts);

    let tempWorkoutName = "";

    const handleAddWorkout = (workout) => {
        const addedWorkout = {
            name: workout,
            exerciseNames:[],
            numSets:[],
            reps:[],
            weights:[],
            rpes:[],
        }
        store.dispatch(addWorkout(addedWorkout));
    }

    return (
        <ScrollView style={styles.container}>
            {/* console.log(workouts[0].workout.reps) */}
            {workouts.map((w, i) => <TouchableOpacity key={i} style={styles.touchable} onPress={() => {
                props.navigation.navigate('Lift', {
                    id: w.id,
                    screen: 'Workout',
                    params: {
                        id: w.id,
                }},)
            }} >
                <Text>{w.workout.name}</Text>
            </TouchableOpacity> )}

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }} >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>Add Workout</Text>
                        
                        <View style={styles.row}>
                            <TextInput style={styles.nameInput} placeholder='Workout Name' returnKeyType='done' onEndEditing={(val) => {tempWorkoutName = val["nativeEvent"]["text"].trim();}} />
                        </View>
                        <View style={styles.row}>
                            <Pressable style={styles.modalButton} onPress={() => {handleAddWorkout(tempWorkoutName); setModalVisible(!modalVisible);}} title='Add' >
                                <Text>Add</Text>
                            </Pressable>
                            <Pressable style={styles.modalButton} onPress={() => {setModalVisible(!modalVisible); }} title='Cancel'>
                                <Text>Cancel</Text>
                            </Pressable>
                        </View>
                            
                    </View>
                </View>
          </Modal>
          <Pressable style={styles.button} title='Add Workout' onPress={() => {
            setModalVisible(!modalVisible);
            }} > 
                <Text>Add Workout</Text>
            </Pressable>
        </ScrollView>
        
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title:{
        fontSize: 40,
        fontWeight: '500',
        textTransform: 'uppercase',
        backgroundColor: '#fff',
    },
    touchable: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "stretch",
        height: 100,
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
        fontSize: 50,
        textAlign: 'center',
        fontWeight: '700',
    },
    row: {
        flexDirection: 'row',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    sectionInput: {
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 10,
        backgroundColor: '#c9c9c7',
        width: 100,
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 10,
    },
    nameInput: {
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 10,
        backgroundColor: '#c9c9c7',
        width: 250,
        borderRadius: 10,
        padding: 5,
        marginHorizontal: 10,
    },
    modalButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        marginHorizontal: 10,
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
    }
})

export default WorkoutMenu;