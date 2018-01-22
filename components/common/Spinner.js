import React, {Component} from 'react';
import { ActivityIndicator ,StyleSheet,View } from 'react-native';

const Spinner=({size})=>{

return(
    <View style={styles.spinnerStyle}>
         <ActivityIndicator size={size}/>
    </View>
);

}

const styles=StyleSheet.create({
    spinnerStyle:{
        flex:1,
        alignItems:'center',
        alignSelf:'center',
    }
})
export {Spinner}