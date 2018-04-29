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
    markers: [],
  };

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
		fetch('https://x7vhm0ojp9.execute-api.us-east-1.amazonaws.com/dev/todos', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
 /* body: JSON.stringify({
    text: position.coords.latitude + "," + position.coords.longitude,
  }),*/
}).then((response) => response.json())
    .then((responseJson) => {
	for (let textObject of responseJson){
        	this.setState({
				markers: this.state.markers.concat([
					{
					coordinates:{
						latitude :parseFloat(textObject.text.split(',')[0]),
						longitude : parseFloat(textObject.text.split(',')[1]),  
					}
					}
					])
                        	
                	 });
	
	}
        return 1;
    })
    .catch((error) => {
      console.error(error);
    });
	
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
		//code for firing the request
		console.log("about to send the request fam")
        fetch('https://x7vhm0ojp9.execute-api.us-east-1.amazonaws.com/dev/todos', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: position.coords.latitude + "," + position.coords.longitude,
  }),
}).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        return 1;
    })
    .catch((error) => {
      console.error(error);
    });
	//error code for geting position		 
	},
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
//end code for getting position
//make request to lambda function
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
    Alert.alert('Your selected contacts will be sent your location!')
  };

  _onPressParentsButton() {
    Alert.alert('Your parents will be sent your location!')
  };

  _onPressFriendsButton() {
    Alert.alert('Your friends will be sent your location!')
  };
  
  _onPressFalseButton() {
    Alert.alert('Cancelling previous alert!')
  };

// this ones the panic long press
  _onLongPressButton = () => {
    Alert.alert('Panic confirmed!');
    this.panic();
  };

render() {
    return (
      <View style={styles.container}>
	
	<TouchableHighlight onPress={this._onPressPanicButton} onLongPress={this._onLongPressButton} underlayColor="white">
          <View style={styles.mainButton}>
            <Text style={styles.panicText}>Alert!</Text>
          </View>
        </TouchableHighlight>

	<MapView
          style={{flex:2,  alignSelf: 'stretch', height: 200 }}
          region={this.state.mapRegion}
          onRegionChange={this._handleMapRegionChange}
	  annotations={this.markers}
        >
	
		<MapView.Marker
			coordinate={this.state.mapRegion}
 		   title={"title"}
	            description={"description"}
		/>

		{this.state.markers.map((marker, index) => ( 
		<MapView.Marker key={index} coordinate={marker.coordinates} title={marker.title} /> ))}		
	
	</MapView>
        
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



