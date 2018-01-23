const INITIAL_STATE={
    Flattitude:'',
    Flongitude:'',
    Ftag:'',
};
const lcrt='lcrt';
export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case lcrt:
            return {INITIAL_STATE};
        default:
            return state;
    }
};