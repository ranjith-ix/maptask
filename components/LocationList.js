import React,{Component} from 'react';
import { Button, CardSection,Card } from './common/index';
import {View,FlatList,Text,AsyncStorage,LayoutAnimation,Platform,UIManager, ScrollView } from 'react-native';
import ListItem from './common/ListItem';
import Swipeout from 'react-native-swipeout';
import AwesomeAlert from 'react-native-awesome-alerts';

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
            showAlert:false,
            tindex:'',
            acolor:'grey',
            bcolor:'white',
            tcolor:'green',
            sbcolor:'blue',
            stcolor:'white',
            sacolor:'white',
            sindex:[],
           
        };
         if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    };
    showAlert = () => {
        this.setState({
          showAlert: true
        });
    };
     
    hideAlert = () => {
        this.setState({
          showAlert: false
        });
    };
    componentWillUpdate(){
        LayoutAnimation.spring();
    }
    componentWillMount(){
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
            console.log('get sucess');
            console.log(json);
            this.setState({array:json});
                         
            }
            else{
                console.log('emptylist fetched for first time')
            }  
        })
        .catch(error => console.log(error));
 

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
        console.log(index);
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.delPressed(index) }
        }];
        if(this.state.sindex.includes(index)){
        var acolor=this.state.sacolor.slice();
        var bcolor=this.state.sbcolor.slice();
        var tcolor=this.state.stcolor.slice();
        }else{
          var acolor=this.state.acolor.slice();
          var bcolor=this.state.bcolor.slice();
          var tcolor=this.state.tcolor.slice();
        }
        
        return(
            <Swipeout right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'>
                <ListItem data={item} navigation={this.props.navigation} index={index}
                onLongPress={(e)=>{this.onLPress(index)}}
                acolor={acolor}
                bcolor={bcolor}
                tcolor={tcolor}   onPress={(e)=>{this.onLButtonPress(item,index)} }

                >
                </ListItem>
            </Swipeout>
        );
    }
    onLButtonPress(item,index){
        if(this.state.sindex.length==0){
        const ix=index;
        const {Flatitude,Flongitude,Ftag}=item;
        this.props.navigation.navigate('MapLocate', {location:{Flatitude,Flongitude,Ftag,ix}});
        }
        else
        {
            this.onLPress(index);
        }
    }
    onLPress(ele){
        
        if(this.state.sindex.includes(ele)){
            console.log('longpressed an already selected element');
          
            console.log(this.state.sindex);
            const si=this.state.sindex.slice();
            const index=si.indexOf(ele);
            si.splice(index,1);
            this.setState({sindex:si});
            const temp=this.state.array.slice();
            this.setState({array:temp});
        }
        else{
          console.log('longpressed');
          
          console.log(this.state.sindex);
          const si=this.state.sindex.slice();
          si.push(ele);
          this.setState({sindex:si});
          const temp=this.state.array.slice();
          this.setState({array:temp});
        }
        
    }
    delPressed(index){
        this.setState({tindex:index});
        this.showAlert();
    }
    deleteRow(){
        const index=this.state.tindex;
        AsyncStorage.getItem('llist')
        .then(req => JSON.parse(req))
        .then((json) =>{
             if(json){
                json.splice(index,1);
                AsyncStorage.setItem('llist', JSON.stringify(json));
                this.setState({array:json},()=>{this.hideAlert();})
           //     this.props.navigation.navigate('LocationList');
            }
        });
    }
   
    render()
    {
        const {showAlert} = this.state;

        return(
            <View style={{marginTop:0,maxHeight:500}}>
               <Card style={{flexDirection:'column',flex:1}}>
               <ScrollView>
               <CardSection>
                    <FlatList
                    data={this.state.array}
                  //  extraData={this.state}
                    renderItem={this.renderRow.bind(this)}
                    />
                    </CardSection>
                    </ScrollView>
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
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Alert!"
                    message="Are you sure?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No, cancel"
                    confirmText="Yes, delete it"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={this.deleteRow.bind(this)}
                />
                </Card>
               
            </View>
        );



    }

}

export default LocationList;