import React,{Component} from 'react';

class LocationList extends Component{

    render()
    {

        getAll:function(){
            return AsyncStorage.getAllKeys().then(ks => {
                return Parse.Promise.when(ks.map(k => AsyncStorage.getItem(k)));
            });
        };

        return(

            <View>
            </View>
        );



    }

}

export default LocationList;