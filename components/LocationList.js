import React,{Component} from 'react';
import { Button, CardSection } from './common/index';
import {View,FlatList,ListView,Text,AsyncStorage } from 'react-native';
import ListItem from './common/ListItem';

class LocationList extends Component{
    static navigationOptions = {
        title: 'LocationList',
    };
    constructor(props) {
        super(props);
        this.state = {
            array:[],
            ldata:'init',
        
        };
        
    };
    componentWillMount(){

       

        if(this.props.navigation.state.params.location){
        
        const ix=this.props.navigation.state.params.location;       
            var newArray = this.state.array;
            newArray.push(ix);
            this.setState({array:newArray},()=>{ console.log(this.state.array)
            });
            AsyncStorage.setItem('myldata',JSON.stringify(newArray));
        }
        else{
            console.log('no prop');
        }
    }   
    
    render()
    {
       
        return(
            <View style={{marginTop:0}}>
               <CardSection>
                    <FlatList
                    data={this.state.array}
                    extraData={this.state}
                    renderItem={({item}) => <ListItem data={item} navigation={this.props.navigation}></ListItem>}
                    />
                    </CardSection>
                    <CardSection>
                <Button onPress={ () => this.props.navigation.navigate('LocationCreate')} >
                    Add 
                </Button>
                </CardSection>
            </View>
        );



    }

}

export default LocationList;