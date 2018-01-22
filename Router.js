import React from 'react';
import { Scene,Router,Actions } from 'react-native-router-flux';
import LocationCreate from './components/LocationCreate';
import LocationList from './components/LocationList';
import MapLocate from './components/MapLocate';

const RouterComponent=()=>{
    return(
        <Router>
        <Scene key="root" hideNavBar={true}>
        <Scene 
            key="LocationList" 
            component={LocationList} 
            title="Employees" 
            onRight={()=>Actions.LCreateScene()}
            rightTitle="Add"
            />
            <Scene key="LCreateScene" title="Create Employee" component={LocationCreate}  initial/>
        <Scene key="OpenMap" title="Your Location" component={MapLocate}/>
        </Scene>
        </Router>
    );
};

export default RouterComponent;