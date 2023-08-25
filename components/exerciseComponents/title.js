import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Title = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleNum}>{props.exerciseNum}</Text>
            <Text style={styles.title}>{props.exerciseName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    title: {
        flex: 6,
        fontSize: 40,
        fontWeight: '500',
        textTransform: 'uppercase',
        margin: 10,
        textAlign: 'right',
    },
    titleNum: {
        flex: 1,
        fontSize: 40,
        fontWeight: '500',
        textTransform: 'uppercase',
        margin: 10,
    },
})


export default Title;