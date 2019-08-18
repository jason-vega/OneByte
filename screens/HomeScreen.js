import React from 'react';
import { Button, Text, StyleSheet, View, ScrollView,
         TouchableHighlight, ImageBackground } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6faff'
  },
  card: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
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
  }
});

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foodEventsData: []
    };

    this.db = firebase.database();
  }

  getFoodEvents(itemsRef) {
      itemsRef.orderByChild('submittedTime').on('value', (snapshot) => { // TODO
        var items = [];

        snapshot.forEach((child) => {
          items.push({
            val: child,
            key: child.key
          });
        });

        this.setState({
          foodEventsData: items
        });
      });
  }

  onGetRenderData() {
    var all_views = [];

    for (let i = this.state.foodEventsData.length - 1; i >= 0; i--) {
      let curr = this.state.foodEventsData[i];
      let foodEvent = JSON.parse(JSON.stringify(curr.val));
      let priceRange = foodEvent.lowestPrice == foodEvent.highestPrice ?
                         "$" + foodEvent.lowestPrice :
                         "$" + foodEvent.lowestPrice + "-" +
                         foodEvent.highestPrice;

      all_views.push(
        <TouchableHighlight key={curr.key} style={styles.card} onPress={() =>
          this.props.navigation.navigate('Details', {foodEventId: curr.key})}>
          <ImageBackground style={styles.cardBackground}
                           source={{uri: foodEvent.picture}}>
            <Text style={{textAlign: "right", padding: 12,
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'}}>
              <Text style={styles.cardTime}>
                {foodEvent.startTime}-{foodEvent.endTime}
              </Text>
              <Text style={styles.cardName}>
                {"\n"}
                {"\n"}
                {"\n"}
                {foodEvent.name}
                {"\n"}
              </Text>
              <Text style={styles.cardLocation}>
                {foodEvent.location}
                {"\n"}
              </Text>
              <Text style={styles.cardPriceRange}>
                {priceRange}
              </Text>
            </Text>
          </ImageBackground>
        </TouchableHighlight>
      );
    }

    if (all_views.length == 0) {
      all_views = <ScrollView contentContainerStyle={{justifyContent: 'center',
                                                      alignItems: 'center',
                                                      flex: 1}}>
                    <Text style={{textAlign: 'center'}}>
                      Loading...
                    </Text>
                  </ScrollView>;
    }
    else {
      all_views = <ScrollView contentContainerStyle={{alignItems: 'stretch'}}>
                    {all_views}
                  </ScrollView>
    }

    return all_views;
  }

  componentDidMount() {
    this.getFoodEvents(this.db.ref('foodEvents'));
  }

  render() {
    return (
      <View style={styles.container}>
        {this.onGetRenderData()}
        <Button title="+" onPress={() =>
          this.props.navigation.navigate('AddEvent')} />
      </View>
    );
  }
}
