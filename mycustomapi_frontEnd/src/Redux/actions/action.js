import {postHttp} from '../../Utils/CommonHttp'

export function createApi(body) {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_LOADING_STATUS", payload: {status:true} })
        const secretID = await postHttp("/create",body)
       if(secretID){
            dispatch({ type: "SUCCESS_CREATE", payload: {secretID,preInput:body} })
       }
       dispatch({ type: "UPDATE_LOADING_STATUS", payload: {status:false} })
    }
}