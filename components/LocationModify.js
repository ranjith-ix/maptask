import React,{Component} from 'react';
import{Text,View,Picker} from 'react-native';
import {Card,CardSection,Input,Button} from './common';
import { StyleSheet,Dimensions,AsyncStorage } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StackNavigator } from 'react-navigation';
 
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.014 ;//Very high zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class LocationCreate extends Component {
    
    static navigationOptions = {
        title: 'Location Edit',
      }
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
        Cregion:null,


        isMapReady: false,
        region: {
          latitude: 11.108524,
          longitude: 77.341066,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        marker: {
            latitude: 71.108524,
            longitude: 77.341066,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
    },
    }
    };
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    componentDidMount(){
  
        this.watchID = navigator.geolocation.getCurrentPosition((position) => {
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
    componentWillMount(){
        console.log(this.props);
        if(this.props.navigation.state.params.location){
            const ix=this.props.navigation.state.params.location; 
            this.setState({
                marker: { ...this.state.marker,latitude:ix.Flatitude,longitude:ix.Flongitude},
                region: { ...this.state.region,latitude:ix.Flatitude,longitude:ix.Flongitude},
                tagname:ix.Ftag,
              });
        }
    }

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
          mapRegion: region,
          // If there are no new values set the current ones
          lastLat: lastLat || this.state.lastLat,
          lastLong: lastLong || this.state.lastLong,
          region:region,

        });
        console.log(lastLong);
      }
    
    LableUpdate(text){
        this.setState({tagname:text});
        console.log(text);
    }
    lUpdate(value){
        if(this.state.pval==1){
            this.setState({visible:false});
        }
        this.setState({pval:value},function(){console.log(this.state.pval)});
        this.setState({
      //      region: { ...this.state.region,latitude:this.state.lastLat,longitude:this.state.lastLong},
        });
    }

    onMapLayout = () => {
        this.setState({ isMapReady: true });
    }

    onMapPress(e) {
        if(this.state.pval==2){
         
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate))
        const coordinate=e.nativeEvent.coordinate;
          this.setState({
            marker: { ...this.state.marker,latitude:coordinate.latitude,longitude:coordinate.longitude},
           region: this.state.Cregion,
          })
          console.log(this.state.marker);
      }
    }
    handleMapRegionChange = mapRegion => {
        this.setState({ region:mapRegion });
    };

    renderMarker(){
        
        if(this.state.marker.latitude!=71.108524)
        {
            return(
            <Marker 
            coordinate={this.state.marker} animateMarkerToCoordinate 
            >
                
            </Marker>
            );
        }
        else{
            return
        }

    }
    renderMap(){
        if(this.state.pval==2)
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
                   showsUserLocation={true}
                   onRegionChangeComplete={this.handleMapRegionChange.bind(this)}                   
                 >
                    {this.renderMarker()}

                </MapView>
               </View>
            );
        }else if(this.state.pval==1){
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
                   showsUserLocation={true}
                   
                 >
                </MapView>
               </View>
            );
        }
        return;
    }
    onCButtonPress(){
       if((this.state.tagname!=''))
       {
       
        const fprop= {Flatitude:'',Flongitude:'2',Ftag:''};
        if(this.state.pval==1)
        {
            fprop.Flatitude=this.state.lastLat;
            fprop.Flongitude=this.state.lastLong;
            
            fprop.Ftag=this.state.tagname;
             console.log(fprop);
             
             this.onSave(fprop);
             return;
         // this.props.navigation.navigate('LocationList', {location:fprop});
        }
        else if(this.state.pval==2)
        {
            if(this.state.marker.latitude!=71.108524)
            {
            fprop.Flatitude=this.state.marker.latitude;
            fprop.Flongitude=this.state.marker.longitude;
           
            fprop.Ftag=this.state.tagname;
            console.log(fprop);
                
            this.onSave(fprop);
            return;
             //this.props.navigation.navigate('LocationList', {location:fprop});
            }
            else{
                alert('select a location on map');
            }
        }      
        
       
        }
        else{
            alert('Kindly give a valid tag name');
        }
    }
    
    onSave(fprop){
        const index=this.props.navigation.state.params.location.ix;
        console.log(index);
        console.log('inside onsave');
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
                 const newArray=json.slice();
                 newArray[index]=fprop;
                
                AsyncStorage.setItem('llist', JSON.stringify(newArray))
                .then(x => AsyncStorage.getItem('llist')
                .then((val) => { 
               // this.setState({storageValue: val ? val : 'EMPTY'});
                    console.log(val);
                    console.log('asyncedited');
                    this.props.navigation.navigate('LocationList');
                }));
            }
        });

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
                         Save 
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