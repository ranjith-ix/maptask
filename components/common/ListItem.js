import React,{ Component } from 'react';
import { Text, TouchableWithoutFeedback,View } from 'react-native';
import { CardSection } from '../common';
import { StackNavigator } from 'react-navigation';


class ListItem extends Component{

    onLButtonPress(){
        const ix=this.props.index;
        const {Flatitude,Flongitude,Ftag}=this.props.data;
        this.props.navigation.navigate('MapLocate', {location:{Flatitude,Flongitude,Ftag,ix}});
    }
    render(){
        console.log(this.props.data);
        return(
            <TouchableWithoutFeedback onPress={this.onLButtonPress.bind(this)}>
            <View>
            <CardSection >
                <Text style={styles.titleStyle}>
                    {this.props.data.Ftag}
                </Text>
            </CardSection>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles={
    titleStyle:{
        fontSize:18,
        paddingLeft:15
    }
};
export default ListItem;