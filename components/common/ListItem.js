import React,{ Component } from 'react';
import { Text, TouchableWithoutFeedback,View, } from 'react-native';
import { CardSection } from '../common';
import { StackNavigator } from 'react-navigation';
import axios from 'axios';


class ListItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
           address:'Address Loading...',
           rdata:[],
           
        };
        
    };
    componentDidMount(){
        const {Flatitude,Flongitude,Ftag}=this.props.data;
        const url='https://maps.googleapis.com/maps/api/geocode/json?latlng='+Flatitude+','+Flongitude+'&key=AIzaSyAxeeOEkd2oqC-KBHL0YwFU0hUIpInUpXQ';
        console.log(url);
        axios.get(url)
        .then(response=>{
            console.log(response.data.results[0].formatted_address);
            this.setState({address:response.data.results[0].formatted_address});
        });
        console.log(this.state.rdata);
    }

    onLButtonPress(){
        const ix=this.props.index;
        const {Flatitude,Flongitude,Ftag}=this.props.data;
        const addr=this.state.address;
        this.props.navigation.navigate('MapLocate', {location:{Flatitude,Flongitude,Ftag,ix,addr}});
    }
    render(){
        console.log(this.props.data);
        return(
            <TouchableWithoutFeedback onPress={this.onLButtonPress.bind(this)} 
            onLongPress={this.props.onLongPress}>
            <View>
            <CardSection style={{flexWrap: 'wrap', flexDirection:'column',backgroundColor:this.props.bcolor}}>
                <Text style={this.titleStyle()}>
                    {this.props.data.Ftag}
                </Text>
                <Text style={this.addressStyle()} numberOfLines={1}>
                    {this.state.address}color
                </Text>
            </CardSection>
            </View>
            </TouchableWithoutFeedback>
        );
    }
    titleStyle=()=>{
        return{
                color:this.props.tcolor,
                flex:2,
                fontSize:18,
                paddingLeft:15,
                paddingTop:10,
                paddingBottom:10,
        };
    }
    addressStyle=()=>{
        return{
            color:this.props.acolor,
            flex:1,
            paddingLeft:15,
            paddingBottom:10,
            fontSize:10,
            paddingRight:30,
        }
    }
}

export default ListItem;