import React, {useState} from 'react';
import { Dimensions, View, StyleSheet, Text, TouchableOpacity, TextInput, Modal, FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { addRecoveryOption, setValRecovery, removeRecovery } from '../redux/recoveryOptionsAction';
import store from '../redux/store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Home = () => {
  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  
  const recovery = useSelector(state => state.recovery.recoveryOptions);

  const shallowRecovery = [...recovery]

  const handleAddRecoveryOption = (option) => {    
    store.dispatch(addRecoveryOption(option))
  }

  const handleAddRecoveryVal = (id, val) => {
    const day = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()

    store.dispatch(setValRecovery(day, id, val))
  }

  const handleRemoveRecovery = (id) => {
    console.log(id)
    store.dispatch(removeRecovery(id))
  }

  tempRecoveryOptionName = "";

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#20201D', }}>
      {console.log(shallowRecovery)}
      <FlatList contentContainerStyle={styles.list} style={{alignSelf: 'stretch'}} data={shallowRecovery} renderItem={({item}) => (
        <View style={styles.recovery}>
          <View style={styles.row}>
            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <MaterialCommunityIcons name="information-outline" color={'#D9D9D4'} size={24} style={{marginLeft: 10}}/>
            </TouchableOpacity>
            <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
              <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{textAlign: 'center',  fontWeight: '600', fontSize: 25, color: '#D9D9D4'}}>{item.name}</Text>
            </View>
            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} onPress={() => Alert.alert("Delete this Option?", undefined, [{text: "Cancel", style: 'cancel'}, {text: "Delete", onPress: (() => handleRemoveRecovery(item.id))}], {cancelable: true})}>
              <MaterialCommunityIcons name="trash-can-outline" color={'#D9D9D4'} size={32} style={{marginRight: 10}}/>
            </TouchableOpacity>
          </View>
          <View style={styles.ratings}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => handleAddRecoveryVal(item.id, 1)}>
              <MaterialCommunityIcons name="emoticon-sad-outline" color={(item.vals[today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()] !== 1) ? '#B9B1D2' : '#D9D9D4'} size={48}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => handleAddRecoveryVal(item.id, 2)}>
              <MaterialCommunityIcons name="emoticon-confused-outline" color={(item.vals[today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()] !== 2) ? '#B9B1D2' : '#D9D9D4'} size={48}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => handleAddRecoveryVal(item.id, 3)}>
              <MaterialCommunityIcons name="emoticon-neutral-outline" color={(item.vals[today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()] !== 3) ? '#B9B1D2' : '#D9D9D4'} size={48}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => handleAddRecoveryVal(item.id, 4)}>
              <MaterialCommunityIcons name="emoticon-happy-outline" color={(item.vals[today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()] !== 4) ? '#B9B1D2' : '#D9D9D4'} size={48}/>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={() => handleAddRecoveryVal(item.id, 5)}>
              <MaterialCommunityIcons name="emoticon-excited-outline" color={(item.vals[today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear()] !== 5) ? '#B9B1D2' : '#D9D9D4'} size={48}/>
            </TouchableOpacity>
            
          </View>
          
        </View>
      )} />
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => {Alert.alert('Modal has been closed.'); setModalVisible(!modalVisible); }} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Add Workout</Text>
            <View style={styles.row}>
              <TextInput style={styles.nameInput} placeholder='Recovery Name' returnKeyType='done' onChangeText={(val) => {tempRecoveryOptionName = val;}} />
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={styles.modalButton} onPress={() => {
                if (tempRecoveryOptionName) {
                  handleAddRecoveryOption(tempRecoveryOptionName.trim());
                  setModalVisible(!modalVisible);
                } else {
                  Alert.alert("New Recovery Option Needs a Name");
                }
              }} title='Add' >
                <Text>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => {setModalVisible(!modalVisible); }} title='Cancel'>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} title='Add Workout' onPress={() => {
        setModalVisible(!modalVisible);
      }} > 
        <Text style={{fontWeight: '500', color: '#0B0B0A'}}>Add Recovery Option</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  recovery: {
    width: Dimensions.get('window').width - 20, 
    alignSelf: 'stretch', 
    alignItems: 'center',
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
    borderRadius: 10,
    margin: 3,
    padding: 5,
    backgroundColor: '#363630',
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
  modalButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    margin: 5,
  },
  button: {
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
    borderRadius: 10,
    alignSelf: "stretch",
    backgroundColor: '#B9B1D2'
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
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  list: {
    alignSelf: 'stretch',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Home;