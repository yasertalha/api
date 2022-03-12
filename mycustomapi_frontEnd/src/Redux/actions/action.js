import {postHttp} from '../../Utils/CommonHttp'

export function createApi(body) {
    return async (dispatch) => {
        const secretID = await postHttp("/create",body)
       if(secretID){
            dispatch({ type: "SUCCESS_CREATE", payload: {secretID,preInput:body} })
       }
    }
}