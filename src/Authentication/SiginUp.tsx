import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export default function SiginUp() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "462974974671-m5jo3j8p82m9bq9ulbuqo5b9ib871t93.apps.googleusercontent.com",
    });
  }, []);
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <Button
        title="Google Sign-In"
        onPress={() =>
          onGoogleButtonPress()
            .then((res) => {
              console.log("res Data===>", res.user);
            })
            .catch((err) => {
              console.log(err);
            })
        }
      />
    </View>
  );
}
