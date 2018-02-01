import React,{Component} from 'react';
import { Button, CardSection,Card } from './common/index';
import {View,FlatList,Text,AsyncStorage,LayoutAnimation,Platform,UIManager } from 'react-native';
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
            acolor:'',
            bcolor:'',
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
      
    renderRow({item,index}){
        console.log(index);
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            onPress: () => { this.delPressed(index) }
        }];

       
        if(this.state.sindex.includes(index))
        {
           var acolor=this.state.sacolor;
           var bcolor=this.state.sbcolor;
           var tcolor=this.state.stcolor;
        }
        else
        {
           var acolor=this.state.acolor;
           var bcolor=this.state.bcolor;
           var tcolor=this.state.tcolor;
        }

        return(
            <Swipeout right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'>
             
             <ListItem data={item} 
             navigation={this.props.navigation} 
             index={index}
             onLongPress={(e)=>{this.onItemLongPress(index)}}
             acolor={acolor}
             bcolor={bcolor}
             tcolor={tcolor}
             >
             </ListItem>

            </Swipeout>
        );
    }

    onItemLongPress(index){
        console.log('longpressed');
        console.log(this.state.sindex);
         
        const si=this.state.sindex.slice();
        si.push(index);
        this.setState({sindex:si});
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
                this.setState({array:json})
           //     this.props.navigation.navigate('LocationList');
            }
        });
      
    }
   
    render()
    {
        const {showAlert} = this.state;

        return(
            <View style={{marginTop:0}}>
               <Card style={{flexDirection:'column',flex:1}}>
               <CardSection>
                    <FlatList
                    data={this.state.array}
                    renderItem={this.renderRow.bind(this)}
                    />
                    </CardSection>
                    <CardSection>
                <Button onPress={ () => {
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