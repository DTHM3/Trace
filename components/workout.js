import { StyleSheet, ScrollView, Text, Modal, View, Button, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import Exercise from './exercise';
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout } from '../redux/workoutAction';

const Workout = (props) => {
  const dispatch = useDispatch();
  const id = props.route.params.id;

  const [modalVisible, setModalVisible] = useState(false);
  const workout = useSelector(state => state.workouts.find((w) =>  w.id === id)).workout;
  
  const tempWorkout = {...workout};

  


    const tempExercise = {
      name: "",
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
      tempWorkout.name = "updated",
      tempWorkout.exerciseNames = [...workout.exerciseNames, tempExercise['name']],
      tempWorkout.numSets = [...workout.numSets, tempExercise['sets']],
      tempWorkout.reps = [...workout.reps, Array(tempExercise['sets']).fill(tempExercise['reps'])],
      tempWorkout.weights = [...workout.weights, Array(tempExercise['sets']).fill(tempExercise['weight'])],
      tempWorkout.rpes = [...workout.rpes, Array(tempExercise['sets']).fill(tempExercise['rpe'])]
      console.log ("temp")
      console.log(tempWorkout);
      dispatch(updateWorkout(id, tempWorkout));
      resetTempExercise();
    }

    return (
      
        <ScrollView>
          <Text style={styles.title}>{workout.name}</Text>
            
          {workout['exerciseNames'].map((exercise, i) => <Exercise key={id + "_" + i} id={id + "_" + i} exerciseName={exercise} exerciseNum={i + 1} isActive={i == 0} numSets={workout.numSets[i]} reps={workout.reps[i]} weights={workout.weights[i]} rpes={workout.rpes[i]} />)}
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Add Exercise</Text>

                <View style={styles.row}>
                  <TextInput style={styles.nameInput} placeholder='Exercise Name' returnKeyType='done' onEndEditing={(val) => {tempExercise['name'] = val["nativeEvent"]["text"].trim();}} />
                </View>

                <View style={styles.row}>
                  <TextInput style={styles.sectionInput} placeholder='Sets' keyboardType='numeric' inputMode='numeric' returnKeyType='done' onEndEditing={(val) => {tempExercise['sets'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                  <TextInput style={styles.sectionInput} placeholder='Reps' keyboardType='numeric' inputMode='numeric' returnKeyType='done' onEndEditing={(val) => {tempExercise['reps'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                </View>

                <View style={styles.row}>
                  <TextInput style={styles.sectionInput} placeholder='Weight' keyboardType='numeric' inputMode='numeric' returnKeyType='done' onEndEditing={(val) => {tempExercise['weight'] = parseInt(val["nativeEvent"]["text"].trim());}} />
                  <TextInput style={styles.sectionInput} placeholder='RPE' keyboardType='numeric' inputMode='numeric' returnKeyType='done' onEndEditing={(val) => {tempExercise['rpe'] = parseInt(val["nativeEvent"]["text"].trim());} } />
                </View>
                        
                <View style={styles.row}>
                  <Pressable style={styles.modalButton} onPress={() => {addExercise(); setModalVisible(!modalVisible);}} title='Add'>
                    <Text>Add</Text>
                  </Pressable>
                  <Pressable style={styles.modalButton} onPress={() => {setModalVisible(!modalVisible); tempExercise['sets'] = 1; tempExercise['reps'] = 0; tempExercise['weight'] = 0; tempExercise['rpe'] = 0; }} title='Cancel'>
                    <Text>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text>Add Exercise</Text>
          </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
      borderWidth: 2,
      marginHorizontal: 10
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      elevation: 3,
      backgroundColor: 'white',
      borderTopWidth: 3,
      borderBottomWidth: 3,
  }
});

export default Workout;