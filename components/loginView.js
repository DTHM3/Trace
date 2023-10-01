import { Button, View, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes,  } from '@react-native-google-signin/google-signin';
import { useState, useEffect } from 'react';

const LoginView = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  return (
    <View>
      <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this._signIn}
              />
    </View>
  )
}

export default LoginView;