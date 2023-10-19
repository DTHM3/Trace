import { Button, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import {
  GDrive,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";

const LoginView = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [signedIn, setSignedIn] = useState(false); // integer state
  const [listData, setListData] = useState(null);
  const [allSeriesData, setAllSeriesData] = useState([]); 


  const getData = async (sheetId, sheetName) => {
    const gdrive = new GDrive();
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;
    // let result = await gdrive.files.getContent(sheetId, null, '1-1');
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${"Sheet1!A1:B2"}`;
    console.log(url)
    const headers = {
      Authorization: `Bearer ${gdrive.accessToken}`
    }
    fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        // Process the data from the Google Sheet
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  function formatResponse(response) {
    const keys = response.values[0];
    const data = response.values.slice(1);
    const obj = data.map(arr => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
    setAllSeriesData(obj);
  }

  let query = '';
  const setQuery = (text) => {
    query = text
  }

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      setUser(null);
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.file',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/spreadsheets.readonly',
    ],
    webClientId: '901265718631-1e5smqkrdbmur2oaobcb0sco1mgdoeku.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  async function onDriveButtonPress(queryProvided) {
    const gdrive = new GDrive();
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;

    let itemsFromDrive = await gdrive.files.list(
      {q: new ListQueryBuilder().e("mimeType", "application/vnd.google-apps.spreadsheet").and().contains("name", queryProvided)}
    );

    setListData(itemsFromDrive['files']);
  }

  function useForceUpdate(){
    setSignedIn(!signedIn); // update the state to force render
  }

  const ItemView = ({item}) => {
    return (
      // FlatList Item
      <TouchableOpacity style={{padding: 10}} onPress={() => getData(item.id, item.name)}>
        <Text>
          File Id: {item.id}
          {'\n'}
          File Name: {item.name}
          {'\n'}
          Mine Type: {item.mimeType}
        </Text>
      </TouchableOpacity>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // FlatList Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const RetComponent = () => {
    if (!user) {
      return (
      <View>
        <Button
        title="Google Sign-In"
        onPress={() => onGoogleButtonPress().then(() => {useForceUpdate(); console.log('Signed in with Google!')})}
        />
        <Text>Login</Text>
      </View>
      )
    }
    if (!listData){
      return (<View>
        <TextInput
          onChangeText={t => setQuery(t)}
          placeholder={query}
        />
        <Button
          title="Drive"
          onPress={() => onDriveButtonPress(query).then(() => {console.log('Done loading Drive!')})}
        />
        <Button
          title="Sign Out"
          onPress={() => signOut().then(() => {useForceUpdate(); console.log('Signed Out');})}
        />
        <Text>Welcome {user.email}</Text>
      </View>)
    } else {
      return (<View>
        <TextInput
          onChangeText={t => setQuery(t)}
          placeholder={query}
        />
        <Button
          title="Drive"
          onPress={() => onDriveButtonPress(query).then(() => {console.log('Done loading Drive!')})}
        />
        <FlatList
          data={listData}
          //data defined in constructor
          ItemSeparatorComponent={ItemSeparatorView}
          //Item Separator View
          renderItem={ItemView}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button
          title="Sign Out"
          onPress={() => signOut().then(() => {useForceUpdate(); console.log('Signed Out');})}
        />
        <Text>Welcome {user.email}</Text>
      </View>)
    }
  }

  if (initializing) return null;
  return (
    <View>
      <RetComponent />
    </View>
  )
}

export default LoginView;