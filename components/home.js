import * as React from 'react';
import { View, Button } from 'react-native';

const Home = (props) => {

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Recovery!' onPress={ () => { console.log(work)}}/>
      </View>
  );
}

export default Home;