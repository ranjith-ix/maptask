import React,{Component} from 'react';
import MapView, { Marker } from 'react-native-maps';
import {View} from 'react-native';

class MapLocate extends Component{
    constructor(props) {
        super(props);
        this.state = {
       tag:this.props.tag,
        isMapReady: false,
        region: {
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        },
        marker: {
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
    },
    }
    };

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    render(){

        <View style={styles.mapContainer}>
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
        >
             <Marker coordinate={this.state.marker} title={this.state.tag} >
               
             </Marker>
        </MapView>
       </View>
    }

}

const styles={
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