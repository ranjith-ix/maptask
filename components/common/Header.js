import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';


export class Header extends Component{
    render() {
      return (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{this.props.headerText}</Text>
            <TouchableWithoutFeedback onPress={this.props.onDeleteTPress}>
            <View style={styles.deleteTextV}>
            <Text style={styles.deleteText}>{this.props.deleteText}</Text>
            </View>
            </TouchableWithoutFeedback>
        </View>
      );
    }
  }
  
  const styles=StyleSheet.create({
      headerView:{
          backgroundColor:'#F8F8F8',
          justifyContent:'center',
          alignItems:'center',
          height:60,
          paddingTop:15,
          shadowColor:'#000',
          shadowOffset:{width:0,height:2},
          shadowOpacity:0.2,
          elevation:2,
          position:'relative',
          flexDirection:'row',
          
      },
      headerText:{
          fontSize:20,
          flex:2,
          alignSelf:'center',
          paddingLeft:20,
      },
      deleteTextV:{
          flex:1,
      },
      deleteText:{
          color:'blue',
      }
  })