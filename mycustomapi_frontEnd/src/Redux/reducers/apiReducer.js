const iState = {
    ipResponse: JSON.stringify([
        {
            "name": "panda",
            "email": "panda101@gmail.com"
        },
        {
            "name": "Bob",
            "email": "bob32@gmail.com"
        },
        {
            "name": "Jai",
            "email": "jai87@gmail.com"
        }
    ]),
      secretID:'69b882a3-ae46-492d-bd45-5914ca3c4e58',
      loading: false,
    };
    
    const apiReducer =(state=iState, actions)=>{
    switch (actions.type) {
        case 'UPDATE_INPUT':
            return {
                ...state,
                ipResponse :actions.payload
            }
        case 'SUCCESS_CREATE':{
            return{
                ...state,
                secretID :actions.payload.secretID,
                preInput :actions.payload.preInput
            }
        }
        case 'UPDATE_LOADING_STATUS':{
            return{
                ...state,
                loading: actions.payload.status
            }
        }
        case 'UPDATE_PREINPUT':{
            return{
                ...state,
                preInput :actions.payload.preInput
            }
        }
        default:
            return state;
    }
    }
    
    export default apiReducer;