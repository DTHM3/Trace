import { StyleSheet, ScrollView, Text, Modal, View, Pressable, Alert, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import Exercise from './exercise';
import ExerciseList from './exerciseComponents/exerciseList';

import { useDispatch, useSelector } from 'react-redux';
import { updateWorkout } from '../redux/workoutAction';

const Workout = (props) => {
  const dispatch = useDispatch();
  const id = props.route.params.id;

  const [modalVisible, setModalVisible] = useState(false);
  const workout = useSelector(state => state.workouts.workouts.find((w) =>  w.id === id)).workout;

  const tempWorkout = {...workout};

  const toggleModal = useCallback(() => {
    setModalVisible(!modalVisible);
  })


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
          {workout['exerciseNames'].map((exercise, i) => <Exercise key={exercise + "_" + id + "_" + i} id={id + "_" + i} workoutId={id} />)}
          <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity onPress={toggleModal}><Text style={styles.title}>Add Exercise</Text></TouchableOpacity>
                <ExerciseList workoutId={id} toggleModal={toggleModal} />
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
    borderBottomWidth: 2,    
    borderColor: '#ebebeb',
    marginBottom: 10
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
    marginTop: '40%',
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '80%',
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
    borderRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
    marginHorizontal: 10
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
  },
  touchable: {
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
  exerciseList: {
    width: '100%',
    marginBottom: 10
  }
});

export default Workout;