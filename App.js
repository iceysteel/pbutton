import React, { Component } from 'react';
import { StyleSheet,Alert, Text,Button, View,Dimensions , TouchableHighlight } from 'react-native';
import { Constants, MapView } from 'expo';

export default class App extends Component {
  state = {
    mapRegion: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
 	error: null,
    },
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  
	panic() {
		console.log("panic confirmed");
		navigator.geolocation.getCurrentPosition(
	     	 (position) => {
      		  this.setState({ 
			mapRegion: {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: 0.002,
				longitudeDelta: 0.002 ,//+ (Dimensions.get('window').width / Dimensions.get('window').height),
			 	error: null,
			}
       		 });
	},
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  _onPressPanicButton =  () => {
	Alert.alert(
  	'Are you sure?',
  	'Next time hold down the button if you are sure',
	  [
	    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
	    {text: 'OK', onPress: () => this.panic()},
	  ],
	  { cancelable: true }
	)
  };



    _onPressContactsButton() {
    Alert.alert('You tapped the button!')
  };

  _onPressParentsButton() {
    Alert.alert('You tapped the button!')
  };

  _onPressFriendsButton() {
    Alert.alert('You tapped the button!')
  };
  
  _onPressFalseButton() {
    Alert.alert('You tapped the button!')
  };

// this ones the panic long press
  _onLongPressButton() {
    Alert.alert('You long-pressed the button!')
  };

render() {
    return (
      <View style={styles.container}>
	
	<TouchableHighlight onPress={this._onPressPanicButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.mainButton}>
            <Text style={styles.panicText}>Panic! </Text>
          </View>
        </TouchableHighlight>

	<MapView
          style={{flex:2,  alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
        />
        
	<View style={{marginTop:20 , marginBottom:20, flexDirection: 'row', justifyContent:'space-between',  }} >
	<TouchableHighlight onPress={this._onPressContactsButton} underlayColor="white">
          <View style={styles.contactsButton}>
            <Text style={styles.buttonText}>Contacts</Text>
          </View>
        </TouchableHighlight>

	<TouchableHighlight onPress={this._onPressParentsButton} underlayColor="white">
          <View style={styles.parentsButton}>
            <Text style={styles.buttonText}>Parents</Text>
          </View>
        </TouchableHighlight>

	<TouchableHighlight onPress={this._onPressFriendsButton} underlayColor="white">
          <View style={styles.friendsButton}>
            <Text style={styles.buttonText}>Friends</Text>
          </View>
        </TouchableHighlight>
	</View>

	
	<TouchableHighlight onPress={this._onPressFalseButton} underlayColor="white">
          <View style={styles.falseButton}>
            <Text style={styles.buttonText}>False Alarm! </Text>
          </View>
        </TouchableHighlight>
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  panic: {
    color: '#e74c3c',
  },
  falseButton: {
    width: 280 ,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffcc00',
    borderRadius: 4 ,
  },
  mainButton: {
    height:80,
    width: 280 ,
    alignItems: "stretch",
    marginTop:20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#e74c3c',
    borderRadius: 4 ,
  },
  contactsButton: {
	flexWrap: 'wrap',
//	flex: 1,
    flexDirection: 'row',
    margin: 2,
    backgroundColor: 'steelblue',
    borderRadius: 4 ,
  },
  parentsButton: {
    flexWrap: 'wrap',
    //flex: 1,
	margin: 2,
    flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: 'skyblue',
    borderRadius: 4 ,
  },
  friendsButton: {
	margin: 2,
	flexWrap: 'wrap',
    //flex: 1,
    flexDirection: 'row',
    //alignItems: 'center',
    backgroundColor: 'powderblue',
    borderRadius: 4 ,
  },

  buttonText: {
    padding: 20,
    color: 'white'
  },
  panicText: {
	justifyContent: "center",
	fontSize:30,
    padding: 20,
    color: 'white'
  }
});



