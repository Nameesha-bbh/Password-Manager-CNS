const initialState = {
    loggedIn: false,
    id: "",
    token: ""
}

const authReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOG_IN": return{
            ...state,
            loggedIn: true,
            id: action.payload.payload.data.userWithToken._id,
            token: action.payload.payload.data.userWithToken.token
        }

        case "LOG_OUT": return {
            initialState
        }

        default: return state
    }
}

export default authReducer