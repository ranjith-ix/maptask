import React,{Component} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {View} from 'react-native';
import {Card,CardSection} from './common';

class MapLocate extends Component{
    constructor(props) {
        super(props);
        this.state = {
       tag:this.props.Ftag,
       latitude: null,
        longitude: null,
        error: null,
        mapRegion: null,
        lastLat: null,
        lastLong: null,
       
       isMapReady: false,
       region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 3,
        longitudeDelta: 4,
       },
       marker: {
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 3,
           longitudeDelta: 4,
    },
    }
    };

    componentDidMount(){

        this.watchID = navigator.geolocation.watchPosition((position) => {
            // Create the object to update this.state.mapRegion through the onRegionChange function
            let region = {
              latitude:       position.coords.latitude,
              longitude:      position.coords.longitude,
              latitudeDelta:  0.00922*1.5,
              longitudeDelta: 0.00421*1.5
            }
            this.onRegionChange(region, region.latitude, region.longitude);
          });
    };

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          lastLat: lastLat || this.state.lastLat,
          lastLong: lastLong || this.state.lastLong
        });
        console.log(lastLong);
      }
    
    componentWillMount(){
        console.log(this.props);
        if(this.props.navigation.state.params.location){
            const ix=this.props.navigation.state.params.location; 
            this.setState({
                marker: { ...this.state.marker,latitude:ix.Flatitude,longitude:ix.Flongitude},
                region: { ...this.state.region,latitude:ix.Flatitude,longitude:ix.Flongitude},
              });
        }
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }
    onMapPress(e) {
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
        const coordinate=e.nativeEvent.coordinate;
          this.setState({
          //  marker: { ...this.state.marker,latitude:coordinate.latitude,longitude:coordinate.longitude},
            region: { ...this.state.region,latitude:coordinate.latitude,longitude:coordinate.longitude},
          })
          console.log(this.state.marker);
      }
    

    renderMap(){
        const ix=this.props.navigation.state.params.location;
            console.log('rendering map');
            return(
                
                <View style={styles.container}>
                <MapView
                   onPress={e => console.log(e.nativeEvent)}
                   style={styles.map}
                   provider='google'
                   mapType='standard'
                   showsScale
                   showsCompass
                   showsPointsOfInterest
                   showsBuildings
                   region={this.state.region}
                   onLayout={this.onMapLayout}
                   onPress={this.onMapPress.bind(this)}
                 >
                     <Marker coordinate={this.state.marker} title={ix.Ftag} showTitle>
                       
                     </Marker>
                </MapView>
               </View>
            );
      
    }

    render(){
      
        
        return(
        <View style={styles.container}>
        <Card>
        <CardSection style={styles.mapContainer}>
                {this.renderMap()}
        </CardSection>
        </Card>
       </View>
       );
    }
}

const styles={
    container:{
        flex: 1,
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute',
    },
    map:{
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute',
    },
    mapContainer:{
        height:380,
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'relative',
    },
};

export default MapLocate;