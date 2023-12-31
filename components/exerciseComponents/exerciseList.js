import { StyleSheet, FlatList } from 'react-native';

import React from 'react';

import { useSelector } from 'react-redux';

import createExerciseButton from './createExerciseButton';
import ExerciseListItem from './exerciseListItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const ExerciseList = (props) => {

    const exercises = useSelector(state => state.exercises.exercises);

    
    return (
        <SafeAreaView style={styles.exerciseList}>
            <FlatList style={{marginBottom: 10}} data={exercises} renderItem={({item}) => (
                <ExerciseListItem toggleModal={props.toggleModal} workoutId={props.workoutId} id={item.id} exerciseName={item.exercise} />
            )} ListHeaderComponent={createExerciseButton} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    touchable: {
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
      exerciseList: {
        width: '100%',
        marginBottom: 10
      }
})

export default ExerciseList;