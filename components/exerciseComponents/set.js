import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

const Set = (props) => {

    return (
        <View style={styles.container} >
            <Text style={styles.set}>Set</Text>
            <Text style={styles.setValue}>{props.value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingHorizontal: 20,
    },
    set: {
        fontSize: 25,
        fontWeight: '500',
        textAlign: 'center',
        marginVertical: 10,
    },
    setValue: {
        textAlign: 'center',
        fontSize: 25,
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
    }
});

export default Set;