import React,{Component} from 'react';
import { Button, CardSection } from './common/index';
import {View,FlatList,Text,AsyncStorage } from 'react-native';
import ListItem from './common/ListItem';

class LocationList extends Component{
    static navigationOptions = {
        title: 'LocationList',
        headerLeft: null
    };
    constructor(props) {
        super(props);
        this.state = {
            array:[],
            ldata:'init',
        
        };
        
    };
   
    componentDidMount(){
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
            console.log('get sucess');
            console.log(json);
                if(this.props.navigation.state.params.location){
                 json.push(this.props.navigation.state.params.location);
                 console.log('paramsreceived arrat updated');  
                }
                else{
                    console.log('no prop');
                }
            this.setState({array:json})
            }
            else{
                console.log('emptylist fetched for first time')
            }  
        })
        .catch(error => console.log('geterror!'));
 

    }

    componentWillMount(){

       

       
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
                <Button onPress={ () => {
                    const someArray =this.state.array.slice();
                   // someArray.push(this.props.navigation.state.params.location);
                    AsyncStorage.setItem('llist', JSON.stringify(someArray))
                    .then((json) =>{ console.log('setsuccess!');console.log(someArray)})
                    .catch(error => console.log('seterror!'));

                    this.props.navigation.navigate('LocationCreate');
                    }} >
                    Add 
                </Button>
                </CardSection>
            </View>
        );



    }

}

export default LocationList;