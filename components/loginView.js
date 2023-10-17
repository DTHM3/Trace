import { Button, View, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import {
  GDrive,
  MimeTypes
} from "@robinbobin/react-native-google-drive-api-wrapper";

const LoginView = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [signedIn, setSignedIn] = useState(false); // integer state

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

  async function onDriveButtonPress() {
    const gdrive = new GDrive();
    gdrive.accessToken = (await GoogleSignin.getTokens()).accessToken;

    console.log(await gdrive.files.list());

    const id = (await gdrive.files.newMultipartUploader()
      .setData([1, 2, 3, 4, 5], MimeTypes.BINARY)
      .setRequestBody({
        name: "multipart_bin"
      })
      .execute()
    ).id;

    console.log(await gdrive.files.getBinary(id));
  }

  function useForceUpdate(){
    setSignedIn(!signedIn); // update the state to force render
  }

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
    return (<View><Button
        title="Drive"
        onPress={() => onDriveButtonPress().then(() => {console.log('Done loading Drive!')})}
      />
      <Button
        title="Sign Out"
        onPress={() => signOut().then(() => {useForceUpdate(); console.log('Signed Out');})}
      />
      <Text>Welcome {user.email}</Text>
    </View>)
  }

  if (initializing) return null;
  return (
    <View>
      <RetComponent />
    </View>
  )
}

export default LoginView;