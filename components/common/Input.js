import React, {Component} from 'react';
import { View,TextInput, Text,StyleSheet } from 'react-native';

const Input =({label,value,placeholder,autoCorrect,onChangeText,secureTextEntry})=>{
        return(
            <View style={styles.inputContainer}>
                <Text style={styles.labelField}>{label}</Text>
                <TextInput
                value={value}
                placeholder={placeholder}
                style={styles.inputField}
                autoCorrect={false}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}                
                />

             </View>
        );
}

const styles=StyleSheet.create({
    
    labelField:{
        paddingLeft:20,
        flex:1,
        fontSize:18,
    },

    inputField:{
        flex:2,
        color:'#000',
        paddingLeft:5,
        paddingRight:5,
        fontSize:18,
        lineHeight:23,
    },

    inputContainer:{
        height:40,
        flex:1,
        flexDirection:'row',
        alignItems:'center',
    }
})
export {Input};