import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    textAlign: 'center'
  },
  motto: {
    fontSize: 20,
    fontStyle: 'italic'
  }
});

export class LoginScreen extends React.Component {
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
          "997779665743-raogo7h1v0ajdqpnic7ejdqknl467rvd.apps.googleusercontent.com",
        iosClientId:
          "997779665743-42delghvr1al1rt8dkouttdo6qu4k7i4.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      })

      console.log(JSON.stringify(result));

      if (result.type === "success") {
        this.props.navigation.navigate('Home');
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.title}>
          OneByte
          {"\n"}
          <Text style={styles.motto}>
          Free and cheap food a byte away
          </Text>
          {"\n"}
          {"\n"}
          </Text>
          <Button title="Sign in with Google"
            onPress={() => this.signIn()}/>
        </View>
    );
  }
}
