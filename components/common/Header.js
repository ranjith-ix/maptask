import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export class Header extends Component{
    render() {
      return (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{this.props.headerText}</Text>
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
          position:'relative'
          
      },
      headerText:{
          fontSize:20,
      }
  })