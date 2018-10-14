import React from 'react';
import { View, Button, Text, StyleSheet, TouchableHighlight,
         ImageBackground, Image, ScrollView } from 'react-native';
import openMap from 'react-native-open-maps';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff'
  },
  cardName: {
    fontSize: 25
  },
  cardLocation: {
    fontSize: 20,
    color: '#404040'
  },
  cardPriceRange: {
    fontSize: 17,
    color: '#007900'
  },
  cardTime: {
    fontSize: 17,
    color: '#ff0000'
  },
  cardBackground: {
    flex: 1,
    width: '100%'
  },
  cardDescription: {
    fontSize: 14
  },
  authorInfo: {
    color: '#515151',
    fontSize: 12
  }
});

export class DetailScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodEventId: this.props.navigation.state.params.foodEventId,
      name: "",
      description: "",
      location: "",
      submittedTime: 0,
      startTime: "",
      endTime: "",
      lowestPrice: 0,
      highestPrice: 0,
      picture: "",
      upVotes: 0,
      downVotes: 0,
      userEmail: ""
    }

    this.db = firebase.database();
  }

  goToLocation() {
    openMap({query: this.state.location});
  }

  getFoodEventData(foodEventId) {
    var ref = this.db.ref("foodEvents/" + foodEventId);

    ref.once('value').then(snapshot => {
      this.setState({
        name: snapshot.val().name,
        description: snapshot.val().description,
        location: snapshot.val().location,
        submittedTime: snapshot.val().submittedTime,
        startTime: snapshot.val().startTime,
        endTime: snapshot.val().endTime,
        lowestPrice: snapshot.val().lowestPrice,
        highestPrice: snapshot.val().highestPrice,
        picture: snapshot.val().picture,
        upVotes: snapshot.val().upVotes,
        downVotes: snapshot.val().downVotes,
        userEmail: snapshot.val().userEmail
      });
    });
  }

  componentDidMount() {
    this.getFoodEventData(this.state.foodEventId);
  }

  render(){
    let priceRange = this.state.lowestPrice == this.state.highestPrice ?
                       "$" + this.state.lowestPrice :
                       "$" + this.state.lowestPrice + "-" +
                       this.state.highestPrice;
    return (
      <View style={styles.container}>
        <Image style={{width: '100%', flex: 1}}
               source={{uri: this.state.picture}} />
        <ScrollView>
          <Text style={{textAlign: "left", padding: 12}}>
            <Text style={styles.cardName}>
              {this.state.name}
              {"\n"}
            </Text>
            <Text style={styles.cardLocation}>
              {this.state.location}
              {"\n"}
            </Text>
            <Text style={styles.cardPriceRange}>
              {priceRange}
              {"\n"}
            </Text>
            <Text style={styles.cardTime}>
              {"\n"}
              {this.state.startTime}-{this.state.endTime}
              {"\n"}
              {"\n"}
            </Text>
            <Text style={styles.cardDescription}>
              Description: {this.state.description}
              {"\n"}
              {"\n"}
            </Text>
            <Text style={styles.authorInfo}>
              Added by {this.state.userEmail} on {new Date(parseInt(this.state.submittedTime)).toUTCString()}
            </Text>
          </Text>
        </ScrollView>
        <Button title="View in Map" onPress={() => this.goToLocation()} />
      </View>
    );
  }
}
