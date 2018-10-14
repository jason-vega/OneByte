import React from 'react';
import { View, Button, Text, StyleSheet, TextInput,
         ScrollView, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff'
  },
  textInput: {
    fontSize: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  }
});

export class AddEventScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      location: "",
      startTime: "",
      endTime: "",
      lowestPrice: 0,
      highestPrice: 0,
      foodEventId: 0,
      errorMessage: null,
    };

    this.db = firebase.database();
  }

  addFoodEvent(name, description, location, submittedTime, startTime, endTime,
               lowestPrice, highestPrice, picture, userEmail) {
      var ref = this.db.ref('foodEvents').push();

      ref.set({
        name: name,
        description: description,
        location: location,
        submittedTime: submittedTime,
        startTime: startTime,
        endTime: endTime,
        lowestPrice: lowestPrice,
        highestPrice: highestPrice,
        picture: picture,
        upVotes: 0,
        downVotes: 0,
        userEmail: userEmail
      });

      return ref.key;
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
        <ScrollView contentContainerStyle={{alignItems: 'stretch'}}>
            <TextInput
              style={styles.textInput}
              placeholder="Event Name"
              onChangeText={(name) => this.setState({name: name})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Location"
              onChangeText={(location) => this.setState({location: location})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Price (Low)"
              onChangeText={(lowestPrice) => this.setState({lowestPrice: lowestPrice})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Price (High)"
              onChangeText={(highestPrice) => this.setState({highestPrice: highestPrice})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Start Time"
              onChangeText={(startTime) => this.setState({startTime: startTime})}
            />
            <TextInput
              style={styles.textInput}
              placeholder="End Time"
              onChangeText={(endTime) => this.setState({endTime: endTime})}
            />
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder="Description"
              onChangeText={(description) => this.setState({description: description})}
            />
        </ScrollView>
        <Button title="Add Event" onPress={() => {
            var foodEventId = this.addFoodEvent(this.state.name,
                                    this.state.description,
                                    this.state.location,
                                    firebase.database.ServerValue.TIMESTAMP,
                                    this.state.startTime,
                                    this.state.endTime,
                                    this.state.lowestPrice,
                                    this.state.highestPrice,
                                    "URL", // TODO: use camera api
                                    "1" // TODO: Get userEmail
                                    );

            this.props.navigation.navigate('Details',
                                           {foodEventId: foodEventId});
          }}
        />
      </KeyboardAvoidingView>
    );
  }
}
