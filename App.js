import  React ,{ Component } from 'react';
import Router from './Router';
import { StackNavigator } from 'react-navigation';
import LocationCreate from './components/LocationCreate';
import LocationList from './components/LocationList';
import MapLocate from './components/MapLocate';


class App extends Component{
   render(){
    return(
       <AppNavigator />
    );
    }
}

const AppNavigator=StackNavigator({
    
    LocationCreate:{screen: LocationCreate},
    LocationList:{screen: LocationList},
    MapLocate:{screen: MapLocate}
});

export default App;