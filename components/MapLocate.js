import React,{Component} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {View,Dimensions} from 'react-native';
import {Card,CardSection} from './common';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.014 ;//Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapLocate extends Component{
    static navigationOptions = {
        title: 'Your Saved Location on Map',
      }
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
          latitude: 11.108524,
          longitude: 77.341066,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        marker: {
            latitude: 22.108524,
            longitude: 77.341066,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
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
    handleMapRegionChange = mapRegion => {
        this.setState({ region:mapRegion });
    };  

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
                   onRegionChangeComplete={this.handleMapRegionChange.bind(this)}                   

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