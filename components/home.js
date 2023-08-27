import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useSelector } from 'react-redux';

const Home = (props) => {

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Recovery!' onPress={ () => { console.log(work)}}/>
      </View>
  );
}

export default Home;