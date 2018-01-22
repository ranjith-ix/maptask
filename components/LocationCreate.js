import React,{Component} from 'react';
import{Text,View,Picker,AsyncStorage} from 'react-native';
import {Card,CardSection,Input,Button} from './common';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class LocationCreate extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        tagname:'',
        pval:'2',
        latitude: null,
        longitude: null,
        error: null,
        mapRegion: null,
        lastLat: null,
        lastLong: null,


        isMapReady: false,
        region: {
          latitude: 47.6062,
          longitude: 122.3321,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
        },
        marker: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02
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
    
    LableUpdate(text){
        this.setState({tagname:text});
        console.log(text);
    }
    lUpdate(value){
        this.setState({pval:value},function(){console.log(this.state.pval)});
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    onMapPress(e) {
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
        const coordinate=e.nativeEvent.coordinate;
          this.setState({
            marker: { ...this.state.marker,latitude:coordinate.latitude,longitude:coordinate.longitude},
            region: { ...this.state.region,latitude:coordinate.latitude,longitude:coordinate.longitude},
          })
          console.log(this.state.marker);
      }
    



    renderMap(){
        if(this.state.pval == 2)
        {
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
                     <Marker coordinate={this.state.marker}>
                       
                     </Marker>
                </MapView>
               </View>
            );
        }
        return;
    }
    onCButtonPress(){
        const fprop= {Flatitude:'',Flongitude:'2'};
        if(this.state.pval==1){
            fprop.Flatitude=this.state.lastLat;
            fprop.Flongitude=this.state.lastLong;
        }
        else if(this.state.pval==2){
            fprop.Flatitude=this.state.marker.latitude;
            fprop.Flongitude=this.state.marker.longitude;
        }
        console.log(fprop);
        let fdata={
            latitude:fprop.latitude,
            longitude:fprop.longitude,
        }
        

        AsyncStorage.setItem(this.state.tagname,JSON.stringify(fprop),()=>{console.log('sucess')});
        return AsyncStorage.getItem(this.state.tagname).then((value) => {
            console.log( JSON.parse(value));
        });
        const keys=AsyncStorage.getAllKeys();
        console.log(keys);
    }

        render()
        {
         

            return(
                
                <Card>
                    <CardSection>
                        <Input
                        label="Location Tag"
                        placeholder="home,work,school"
                        value={this.state.tagname}
                        onChangeText={text => this.LableUpdate(text)}
                        />
                    </CardSection>

                    <CardSection>
                        <Text style={styles.pickerTextStyle}> How would you specify a location? </Text>
                        <Picker
                        style={{flex:1}}
                        selectedValue={this.state.pval}
                        onValueChange={value => this.lUpdate(value)}>
                            <Picker.Item key="1" label="CurrentLocation" value="1" />
                            <Picker.Item key="2" label="Selectonmap" value="2" />
                        </Picker>
                    </CardSection>
                    
                    
                    <CardSection style={styles.mapContainer}>
                     {this.renderMap()}
                    </CardSection>

                    <CardSection>
                        <Button onPress={this.onCButtonPress.bind(this)}>
                         Create    
                        </Button>
                    </CardSection>

                </Card>

            );
        }


};


const styles={
    pickerTextStyle:{
        flex:1,
        fontSize:18,
        paddingLeft:20
    },
    radius:{
        height:50,
        width:50,
        borderRadius:50/2,
        overflow:'hidden',
        backgroundColor:'rgba(0,122,255,0.1)',
        borderWidth:1,
        borderColor:'rgba(0,122,255,0.3)',
        alignItems:'center',
        justifyContent:'center',
    },
    marker:{
        height:20,
        width:20,
        borderWidth:3,
        borderColor:'white',
        borderRadius:20/2,
        overflow:'hidden',
        backgroundColor:'#007AFF'
    },
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

export default LocationCreate;