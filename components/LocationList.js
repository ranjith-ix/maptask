import React,{Component} from 'react';
import { Button, CardSection } from './common/index';
import {View,FlatList,Text,AsyncStorage,LayoutAnimation,Platform,UIManager } from 'react-native';
import ListItem from './common/ListItem';
import Swipeout from 'react-native-swipeout';

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
         if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    };
    componentWillUpdate(){
        LayoutAnimation.spring();
    }
   
    componentDidMount(){
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
            console.log('get sucess');
            console.log(json);
            this.setState({array:json});
                if(this.props.navigation.state.params.location){
                    json.push(this.props.navigation.state.params.location);
                 this.setState({array:json})
                 const someArray =this.state.array.slice();
                 // someArray.push(this.props.navigation.state.params.location);
                  AsyncStorage.setItem('llist', JSON.stringify(someArray))
                 console.log('paramsreceived arrat updated');  
                }
                else{

                    this.setState({array:json})
                   const someArray =this.state.array.slice();
                 // someArray.push(this.props.navigation.state.params.location);
                  AsyncStorage.setItem('llist', JSON.stringify(someArray))


                    console.log('no prop');
                }
           
            }
            else{
                console.log('emptylist fetched for first time')
            }  
        })
        .catch(error => console.log(error));
 

    }
    
    renderRow({item,index}){
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.deleteRow(index) }
          }];
        return(
            <Swipeout right={swipeBtns}
            autoClose='true'
            backgroundColor= 'transparent'>
                <ListItem data={item} navigation={this.props.navigation} index={index}></ListItem>
            </Swipeout>
        );
    }
    deleteRow(index){
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
                json.splice(index,1);
                AsyncStorage.setItem('llist', JSON.stringify(json));
                this.setState({array:json})
           //     this.props.navigation.navigate('LocationList');
            }
        });
    }
    render()
    {
       
        return(
            <View style={{marginTop:0}}>
               <CardSection>
                    <FlatList
                    data={this.state.array}
                    extraData={this.state}
                    renderItem={this.renderRow.bind(this)}
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