import firebase  from 'firebase';
import {Actions} from 'react-native-router-flux';

export const locationCreate=({Flattitude,Flongitude,Ftag})=>{
    return(dispatch)=>{
        firebase.database().ref(`/users/locations`)
        .push({Flattitude,Flongitude,Ftag})
        .then(()=>{
            console.log({Flattitude,Flongitude,Ftag});
            dispatch({ type:'lcrt' });
            Actions.main({type:'reset'})
        });
    };
}

