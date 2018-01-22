import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card =(props) =>{
    return(
        <View style={styles.ccontainer}>
        {props.children}
        </View>
    );
}

const styles=StyleSheet.create({
    ccontainer:{
        borderWidth:1,
        borderRadius:2,
        borderColor:'#ddd',
        shadowColor:'#000',
        borderBottomWidth:0,
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,
        shadowRadius:2,
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:10
    }
})
export { Card };