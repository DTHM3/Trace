import * as React from 'react';
import { View, Button } from 'react-native';

const Home = () => {
  const date = new Date();


  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Recovery!' onPress={ () => { console.log(date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear())}}/>
      </View>
  );
}

export default Home;