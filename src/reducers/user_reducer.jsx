import { ADD_FRIEND, GET_ALL_USERS, SET_FRIEND_ID, HANDLE_SELECT } from "../actions";


const user_reducer = (state, action) => {
    switch(action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                all_users:action.payload
            }
        // case ADD_FRIEND: 
        //     return {
        //     ...state,
        //     friends: action.payload.newFriends
            
        // }

        // case SET_FRIEND_ID:
        //     return {
        //         ...state,
        //         friendId: action.payload
        //     }

        case HANDLE_SELECT:
            return {
                ...state,
                my_user: action.payload
            }  
        default:
            return state
    }

}

export default user_reducer;