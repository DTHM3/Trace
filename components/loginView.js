import { Button, View, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const LoginView = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

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

  if (initializing) return null;

  if (!user) {
    return (
      
      <View>
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
        <Text>Login</Text>
      </View>
    )
  }
  return (
    <View>
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
        <Text>Welcome {user.email}</Text>
      </View>
  );
}

export default LoginView;