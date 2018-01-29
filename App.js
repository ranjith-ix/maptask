import  React ,{ Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LocationCreate from './components/LocationCreate';
import LocationList from './components/LocationList';
import MapLocate from './components/MapLocate';
import LocationModify from './components/LocationModify';


class App extends Component{
   render(){
    return(
       <AppNavigator />
    );
    }
}

const AppNavigator=StackNavigator({
    LocationList:{screen: LocationList},
    LocationCreate:{screen: LocationCreate},
    MapLocate:{screen: MapLocate},
    LocationEdit:{screen:LocationModify}
});

export default App;