import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Button, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginView = () => {
    WebBrowser.maybeCompleteAuthSession();

    const [userInfo, setUserInfo] = React.useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "901265718631-olr5fou31hjovtnj2l852h743bfu0n4i.apps.googleusercontent.com",
        iosClientId: "901265718631-su29ctg3dk33qtd756sjuqb4mqp4c5kl.apps.googleusercontent.com",
        webClientId: "901265718631-1e5smqkrdbmur2oaobcb0sco1mgdoeku.apps.googleusercontent.com"
    })

    React.useEffect(() => {handleSignInWithGoogle();}, [response])

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        if (!user) {
            if(response.type === "success") {
                await getUserInfo(response.authentication.accessToken);
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    const getUserInfo = async (token) => {
        if (!token) return;
        try {
            const response = await fetch(
                "https://www.googleapis.com/userinfo/v2/me",
                {
                    headers: { Authorization: `Bearer ${token}`}
                }
            )

            const user = await response.json();
            await AsyncStorage.setItem("@user", JSON.stringify(user));
            setUserInfo(user);
        } catch (error) {

        }
    }

    return (
        <View>
            <Text>{JSON.stringify(userInfo)}</Text>
            <Button title="Sign in with Google" onPress={promptAsync} />
        </View>
    )
}

export default LoginView;